# Docker

## Estructura de archivos

```
├── Dockerfile                       # Multi-stage build
├── docker-compose.yml               # Base (volúmenes, networks, healthcheck)
├── docker-compose.development.yml   # Override para desarrollo
├── docker-compose.production.yml    # Override para producción
└── .dockerignore
```

## Dockerfile — 4 etapas

| Etapa | Propósito |
|---|---|
| `base` | Instala dependencias (`npm ci`) |
| `development` | Copia código fuente, entrypoint `tsx watch` |
| `builder` | Compila TypeScript + `prisma generate` + limpia devDeps |
| `production` | Solo copia `dist/` y `node_modules` desde builder |

## Desarrollo local

```bash
# Levantar todo (sin pgAdmin)
docker compose \
  -f docker-compose.yml \
  -f docker-compose.development.yml \
  up --build --watch

# Con pgAdmin
docker compose \
  -f docker-compose.yml \
  -f docker-compose.development.yml \
  --profile dbClient \
  up --build --watch

# En background
docker compose \
  -f docker-compose.yml \
  -f docker-compose.development.yml \
  up --build --watch -d
```

### Hot-reload

El flag `--watch` activa `develop.watch` de Compose:
- **Sincronización**: cambios en `./src/` se copian al contenedor
- **Rebuild**: cambios en `package.json` reconstruyen la imagen
- Dentro del contenedor, `tsx watch` reinicia el proceso sin EADDRINUSE

## Producción

```bash
docker compose \
  -f docker-compose.yml \
  -f docker-compose.production.yml \
  up --build -d
```

## Servicios

| Servicio | Imagen | Propósito |
|---|---|---|
| `turtle-backend` | Construida por Dockerfile | API NestJS |
| `postgres-db` | `postgres:18-alpine` | Base de datos |
| `pgadmin` | `dpage/pgadmin4` (opcional, perfil `dbClient`) | Admin UI |

## Healthchecks

| Servicio | Comando | Periodo |
|---|---|---|
| `turtle-backend` | `node -e "http.get(... /health ...)"` | Cada 15s |
| `postgres-db` | `pg_isready` | Cada 10s |
| `pgadmin` | `wget http://localhost:80/misc/ping` | Cada 10s |

## Variables de entorno

Ver `.env.template` para la lista completa. Las variables clave:

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Conexión a PostgreSQL (usar `postgres-db` como host) |
| `PORT` | Puerto del backend (default 3000) |
| `POSTGRES_*` | Credenciales de la base de datos |
| `PGADMIN_*` | Credenciales de pgAdmin |

## Comandos útiles

```bash
# Ver logs
docker compose logs -f turtle-backend

# Ejecutar comando dentro del contenedor
docker compose exec turtle-backend sh

# Ver estado de salud
docker ps --filter name=turtle-backend

# Bajar todo y limpiar volúmenes
docker compose \
  -f docker-compose.yml \
  -f docker-compose.development.yml \
  down -v
```
