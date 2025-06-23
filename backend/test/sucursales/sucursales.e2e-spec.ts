import { INestApplication } from "@nestjs/common";
import { TestingModule, Test } from "@nestjs/testing";
import request from 'supertest'
import { AppModule } from "src/app.module";
import { Sucursal } from "src/entities/sucursal.entity";
import { generarSucursalEntidad } from "../utils/sucursal-fixture";
import { DataSource } from "typeorm";

jest.setTimeout(20000);

describe('SucursalController (e2e)', () => {
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

    it('debería crear una sucursal correctamente', async () => {
        const sucursalRepo = dataSource.getRepository(Sucursal);
        const sucursal = generarSucursalEntidad();

        const response = await request(app.getHttpServer())
            .post('/sucursal')
            .send(sucursal)
            .expect(201);

        const sucursalCreada = response.body;

        const sucursalEncontrada = await sucursalRepo.findOneBy({ id_sucursal: sucursalCreada.id_sucursal });
        expect(sucursalEncontrada).toBeDefined();
        expect(sucursalEncontrada?.direccion).toBe(sucursal.direccion);
    });
});