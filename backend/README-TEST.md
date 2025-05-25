# Test de Integración - Proyecto Backend Farmacia

Este archivo describe los pasos necesarios para ejecutar los tests de integración del backend utilizando Docker y Jest.

## Ubicación de los archivos

- `docker-compose.yml` → raíz del proyecto (AppFarmacia)
- `Dockerfile.test` → dentro de la carpeta `backend/`
- Archivos de test → dentro de `backend/test/`

## Construcción de los contenedores

Ejecutar desde la raíz del proyecto (`AppFarmacia`):

```bash
docker-compose build
```

O si querés correr y construir directamente el contenedor de test:

```bash
docker-compose run --rm --build test
```

Esto:
- Crea el contenedor de `mysql-farmacia` con la base de datos de testing.
- Construye la imagen para `backend-test` con Jest.
- Ejecuta los tests E2E desde `backend/test/`.

## Ejecutar solo los tests (si los contenedores ya están creados)

Desde la raíz del proyecto:

```bash
docker-compose run --rm test
```

> Este comando ejecuta los tests y luego elimina el contenedor (`--rm`).

## Notas

- Los tests usan `supertest` y `jest` con `ts-jest`.
- Si modificás código en `backend/`, reconstruir antes de testear:
  ```bash
  docker-compose build
  ```