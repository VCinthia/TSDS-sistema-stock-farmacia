import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from 'supertest';
import { AppModule } from "src/app.module";
import { Producto } from "src/entities/producto.entity";
import { generarProductoEntidad } from "../utils/producto-fixture";
import { DataSource } from "typeorm";

jest.setTimeout(20000);

describe('ProductosController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        dataSource = moduleFixture.get(DataSource);
    });

    afterAll(async () => {
        if (app) await app.close();
    });

    it('debería crear un producto correctamente', async () => {
        const productoRepo = dataSource.getRepository(Producto);
        const producto = generarProductoEntidad();

        const response = await request(app.getHttpServer())
            .post('/producto')
            .send(producto)
            .expect(201);

        const productoCreado = response.body;

        const productoEncontrado = await productoRepo.findOneBy({ id_producto: productoCreado.id_producto });
        expect(productoEncontrado).toBeDefined();
        expect(productoEncontrado?.nombre).toBe(producto.nombre);
    });
});