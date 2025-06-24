import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { Lote } from "src/entities/lote.entity";
import { Sucursal } from "src/entities/sucursal.entity";
import { generarLoteEntidad } from "../utils/lote-fixture";
import { generarSucursalEntidad } from "../utils/sucursal-fixture";
import { DataSource } from "typeorm";
import request from 'supertest';
import { Producto } from "src/entities/producto.entity";
import { generarProductoEntidad } from "../utils/producto-fixture";
import { ErrorCodes } from "common/constants/error-codes";

jest.setTimeout(20000);

describe('LotesController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useLogger(false);

        await app.init();

        dataSource = moduleFixture.get(DataSource);
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    it('debería crear un lote correctamente', async () => {
        const productoRepo = dataSource.getRepository(Producto);
        const sucursalRepo = dataSource.getRepository(Sucursal);
        const loteRepo = dataSource.getRepository(Lote);

        const producto = await productoRepo.save(generarProductoEntidad());
        const sucursal = await sucursalRepo.save(generarSucursalEntidad());

        const lote = generarLoteEntidad();

        const response = await request(app.getHttpServer())
            .post('/lote')
            .send({
                cantidad: lote.cantidad,
                fecha_vencimiento: lote.fecha_vencimiento.toISOString(),
                id_producto: producto.id_producto,
                id_sucursal: sucursal.id_sucursal
            })
            .expect(200);

        const loteCreado = response.body;

        const loteEncontrado = await loteRepo.findOne({
            where: { id_lote: loteCreado.data.id_lote },
            relations: ['producto', 'sucursal'],
        });

        expect(loteEncontrado).toBeDefined();
        expect(loteCreado.success).toBe(true);
        expect(loteCreado.data.producto.id_producto).toBe(producto.id_producto);
        expect(loteCreado.data.sucursal.id_sucursal).toBe(sucursal.id_sucursal);
    });

    it('no debería crear un lote si falta id_producto', async () => {
        const sucursalRepo = dataSource.getRepository(Sucursal);
        const sucursal = await sucursalRepo.save(generarSucursalEntidad());
        const lote = generarLoteEntidad();

        const response = await request(app.getHttpServer())
            .post('/lote')
            .send({
                cantidad: lote.cantidad,
                fecha_vencimiento: lote.fecha_vencimiento.toISOString(),
                id_producto: 455,
                id_sucursal: sucursal.id_sucursal
            })
            .expect(200);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBeDefined();
        expect(response.body.error.code).toBe(ErrorCodes.NOT_FOUND);
    });
});