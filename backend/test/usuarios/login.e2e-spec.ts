import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { DataSource } from 'typeorm';
import { generarUsuarioEntidad } from '../utils/usuario-fixture';
import { Usuario } from 'src/entities/usuario.entity';
import { ErrorCodes } from 'common/constants/error-codes';

jest.setTimeout(20000);

describe('LoginController (e2e)', () => {
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

    it('/usuario/login (POST) debe loguear con credenciales correctas', async () => {
        const usuarioRepo = dataSource.getRepository(Usuario);
        const usuario = generarUsuarioEntidad();

        await usuarioRepo.save(usuario);

        const response = await request(app.getHttpServer())
            .post('/usuario/login')
            .send({ email: usuario.email, password: usuario.password })
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data.email).toBe(usuario.email);
    });

    it('/usuario/login (POST) debe fallar con contraseña incorrecta', async () => {
        const usuarioRepo = dataSource.getRepository(Usuario);
        const usuario = generarUsuarioEntidad();

        await usuarioRepo.save(usuario);

        const response = await request(app.getHttpServer())
            .post('/usuario/login')
            .send({ email: usuario.email, password: 'contrasena_incorrecta' })
            .expect(200);

        expect(response.body.success).toBe(false);
        expect(response.body.message).toBeDefined();
        expect(response.body.error.code).toBe(ErrorCodes.UNAUTHORIZED);
    });
});
