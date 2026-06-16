# API

## Endpoints

### `GET /`

Respuesta básica del servidor.

```bash
curl http://localhost:3000/
# → Hello World
```

| Código | Descripción |
|---|---|
| 200 | OK |

---

### `GET /health`

Health check del sistema usando `@nestjs/terminus`.

```bash
curl http://localhost:3000/health
```

**Respuesta exitosa:**
```json
{
  "status": "ok",
  "info": {
    "nestjs-docs": { "status": "up" },
    "database": { "status": "up" }
  }
}
```

**Indicadores:**
- `nestjs-docs`: verifica conectividad HTTP externa
- `database`: verifica conexión a PostgreSQL vía Prisma

| Código | Descripción |
|---|---|
| 200 | Todos los servicios saludables |
| 503 | Algún servicio caído |

---

### `GET /warehouse`

Lista almacenes (tabla `storage_rooms`).

```bash
curl http://localhost:3000/warehouse
curl "http://localhost:3000/warehouse?name=principal&page=1"
```

**Query params:**

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `name` | string | No | Filtro por nombre |
| `page` | number | No | Número de página |

**Respuesta:**
```json
[
  {
    "storage_room_id": 1,
    "name": "Cámara Fría",
    "description": "Almacenamiento refrigerado",
    "location": "Sótano"
  }
]
```

| Código | Descripción |
|---|---|
| 200 | Lista de almacenes |

---

### `POST /warehouse`

Crea un nuevo almacén (endpoint en construcción).

```bash
curl -X POST http://localhost:3000/warehouse \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuevo","address":"Dirección","description":"Descripción"}'
```

**Body:**

| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `name` | string | Sí | Nombre del almacén |
| `address` | string | Sí | Dirección |
| `description` | string | Sí | Descripción |

| Código | Descripción |
|---|---|
| 201 | Recurso creado |

> ⚠️ Endpoint parcial — actualmente retorna un string fijo mientras se completa la implementación.

---

## Convenciones generales

- **Base URL**: `http://localhost:3000`
- **Content-Type**: `application/json`
- **Códigos HTTP** estándar de REST
- Los errores retornan `{ "statusCode": XXX, "message": "...", "error": "..." }`
