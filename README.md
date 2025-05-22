# Proyecto Integrador 4 - Sistema de Control de Stock para Farmacias

Aplicación web fullstack desarrollada como trabajo final de la materia **PROYECTO INTEGRADOR 4**. El sistema permite gestionar el stock de medicamentos y productos farmacéuticos mediante un frontend en Angular, y un backend desarrollado en NestJS con TypeORM, conectado a una base de datos MySQL alojada en un contenedor Docker.

---

## Información general

- **Materia:** Proyecto Integrador 4
- **Docente a cargo:** Kevin Axel Del Bello
- **Carpeta compartida del proyecto:**  [📂 Google Drive](https://drive.google.com/drive/folders/1E7ZeRBLJgHsfDp4LDoEnnME4aTKc1KbO?hl=es)


---

## Integrantes del grupo

| ID | Integrantes |
| -- | -----------------|
| 1  | Cynthia Estefanía Choque Galindo |
| 2  | Mauricio Galera |
| 3  | Matías Garnica |
| 4  | Guido Vizzotti |
| 5  | Cinthia Romina Vota |

---

## Modelo

![Diagrama Entidad-Relación (DER)](https://github.com/user-attachments/assets/7f14d762-bd48-4098-bdac-c8e24f5a9fd8)

---

## Tecnologías utilizadas

- **Frontend:** Angular 17 (con CSS)
- **Backend:** NestJS + TypeORM
- **Base de datos:** MySQL 8 (contenedor Docker)
- **DevOps:** Docker Compose, archivo `.env`, estructura de entorno compartido
- **Testing:** Jest para pruebas unitarias en backend
- **Documentación API:** Swagger/OpenAPI

---

## Instalación del entorno

### Clonar el repositorio

```bash
git clone https://github.com/VCinthia/TSDS-sistema-stock-farmacia.git
cd TSDS-sistema-stock-farmacia
```

### Levantar la base de datos (Docker Compose)

```bash
docker-compose up -d
```

Esto iniciará un contenedor MySQL en el puerto `3306` con los siguientes datos:

- **Usuario:** `root`
- **Contraseña:** `1234`
- **Base de datos:** `sistemastock`


### Conexión a la base de datos desde DBeaver o MySQL Workbench

Si al intentar conectarte a la base de datos MySQL del contenedor se muestra el siguiente error:

> `Public Key Retrieval is not allowed`

Esto ocurre porque MySQL 8 usa por defecto un método de autenticación llamado `caching_sha2_password`, que algunos clientes no permiten usar sin configuración adicional.


### DBeaver

**Solución 1: modificar propiedades del driver**

1. Abrir la conexión `sistemastock` y hacer clic en **Editar conexión**.
2. Ir a la pestaña **Driver Properties**.
3. Buscar y cambiar a TRUE:
   - **Name:** `allowPublicKeyRetrieval`
   - **Value:** `true`
4. Verificar que `useSSL` esté configurado como `false`.

**Solución 2: modificar directamente la URL JDBC**

```
jdbc:mysql://localhost:3306/sistemastock?allowPublicKeyRetrieval=true&useSSL=false
```

Pegar esta URL en la pestaña de configuración principal.


### MySQL Workbench

En general, MySQL Workbench **no presenta este error**, pero si llega a ocurrir:

1. Editar la conexión.
2. En la pestaña **Advanced** o **Options**, buscar un campo para propiedades adicionales.
3. Agregar lo siguiente a la URL de conexión:

```
?allowPublicKeyRetrieval=true&useSSL=false
```

---

## Backend (NestJS)

```bash
cd backend
npm install
npm run start:dev
```

- Acceso a documentación de la API (Swagger):  [http://localhost:3000/api](http://localhost:3000/api)

---

## Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

- Acceso:  [http://localhost:4200](http://localhost:4200)

---

## Estructura de carpetas

```bash
/AppFarmacia
├── backend/              # NestJS backend
├── frontend/             # Angular frontend
├── docker-compose.yml    # Contenedor MySQL
├── .env                  # Configuración de conexión
├── devops/               # Carpeta tareas de DevOps (proximamente)
└── README.md
```

---

## 📌 Notas

- Las tablas se crean automáticamente con TypeORM (`synchronize: true`) durante el desarrollo.
- En la etapa final del proyecto, se generará un `init.sql` para compartir una base con datos cargados.



### Para detener y eliminar contenedor (Docker Compose)

```bash
docker-compose down -v   # 👈 borra los volúmenes (incluye la base)
docker-compose up --build   #para volver a instalar nuevso cambios

docker-compose up -d  


docker ps
docker logs <id-del-contenedor>
```