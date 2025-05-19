# Proyecto Integrador 4 - Sistema de Control de Stock para Farmacias

Aplicación web fullstack desarrollada como trabajo final de la materia PROYECTO INTEGRADOR 4. El sistema permite gestionar el stock de medicamentos y productos farmacéuticos mediante un frontend en Angular, y un backend desarrollado en NestJS con TypeORM, conectado a una base de datos MySQL alojada en un contenedor Docker.

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
git clone <url-del-repo>
cd AppFarmacia
```

### Levantar la base de datos (Docker Compose)

```bash
docker-compose up -d
```

Esto iniciará un contenedor MySQL en el puerto `3306` con los siguientes datos:

- **Usuario:** `root`
- **Contraseña:** `1234`
- **Base de datos:** `sistemastock`

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
