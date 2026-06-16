# Base de Datos

## Enfoque: Database-First

La base de datos se define mediante **scripts SQL** en `database/scripts/`. Prisma no gestiona migraciones — se usa `prisma db pull` para sincronizar el schema de Prisma con la base de datos real.

## Entorno

- **Motor**: PostgreSQL 18 (Alpine)
- **Usuario app**: `prisma_user` (privilegios mínimos)
- **Usuario admin**: `db_admin` (para pgAdmin)
- **Base de datos**: `turtledb`

## Modelos (17 tablas)

### Catálogo

| Tabla | Descripción |
|---|---|
| `menu_items` | Ítems del menú (platos individuales y combos) |
| `menu_item_tags` | Etiquetas para clasificar ítems |
| `menu_item_tagging` | Relación N:M entre ítems y etiquetas |
| `menu_item_ingredients` | Receta: qué insumos lleva cada ítem y en qué proporción |
| `combo_description` | Composición de combos (qué ítems incluye y factor de equivalencia) |

### Inventario

| Tabla | Descripción |
|---|---|
| `internal_supplies` | Insumos internos (con código único, stock min/max, UOM) |
| `internal_supply_tags` | Etiquetas para clasificar insumos |
| `supply_tagging` | Relación N:M entre insumos y etiquetas |
| `units_of_measurement` | Unidades de medida (kg, L, unid, etc.) |
| `storage_rooms` | Ubicaciones físicas de almacenamiento (almacenes/cámaras) |
| `internal_supplies_location` | Stock de cada insumo en cada ubicación |

### Proveedores

| Tabla | Descripción |
|---|---|
| `suppliers` | Proveedores registrados (RUC único, razón social) |
| `supplier_catalog_items` | Catálogo de productos por proveedor (precio, factor de conversión) |
| `supplier_contact_methods` | Medios de contacto por proveedor (email, teléfono, WhatsApp) |

### Pedidos

| Tabla | Descripción |
|---|---|
| `restaurant_table` | Mesas del restaurante (con QR token) |
| `customer_order` | Pedidos de clientes (estado, pago, tipo) |
| `customer_order_items` | Detalle de cada pedido (ítem, cantidad, estado) |

## Enums (8)

| Enum | Valores |
|---|---|
| `contact_method_type` | `email`, `phone`, `WhatsApp` |
| `customer_order_item_status_type` | `pending`, `preparing`, `finished` |
| `customer_order_payment_status_type` | `pending`, `paid` |
| `customer_order_status_type` | `pending`, `preparing`, `on the way`, `delivered` |
| `customer_order_type` | `dine in`, `take out`, `delivery` |
| `menu_item_status_type` | `available`, `out of stock`, `discontinued` |
| `menu_item_type` | `combo`, `item` |
| `restaurant_table_status_type` | `available`, `occupied` |

## Convenciones de naming

- **Snake case** para tablas y columnas (estilo PostgreSQL)
- **Singular** para nombres de tabla
- **Primary keys**: `{tabla}_id` con `GENERATED ALWAYS AS IDENTITY`
- **Foreign keys**: `{tabla_origen}_{columna}_fk`
- **Unique constraints**: `{tabla}_unique`
- **Primary key constraints**: `{tabla}_pk`

## Scripts SQL

| Script | Propósito | Cuándo se ejecuta |
|---|---|---|
| `database/scripts/initialization/01_users.sql` | Crea `db_admin` y `prisma_user` | Al iniciar postgres por primera vez |
| `database/scripts/schema/schema.sql` | DDL completo (tablas, enums, constraints) | Manual |
| `database/scripts/seed/seed.sql` | Datos de prueba | Manual |

## Workflow de cambios

```bash
# 1. Editar SQL
vim database/scripts/schema/schema.sql

# 2. Aplicar a la base de datos (via psql o pgAdmin)

# 3. Sincronizar Prisma
npx prisma db pull
npx prisma generate

# 4. Commitear schema.prisma + generated/
```
