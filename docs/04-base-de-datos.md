# 04 — Base de datos

## Enfoque: Database-First

La base de datos se define con **SQL puro** en `database/scripts/`. Prisma no gestiona migraciones:

```
database/scripts/
├── initialization/
│   └── 01_users.sql       # Crea db_admin y prisma_user
├── schema/
│   └── schema.sql         # DDL completo (17 tablas, 8 enums)
└── seed/
    └── seed.sql           # Datos de prueba
```

```mermaid
flowchart LR
    SQL["Editas SQL\nschema.sql"] -->|"psql / pgAdmin"| BD["PostgreSQL 18"]
    BD -->|"prisma db pull"| Prisma["schema.prisma\nactualizado"]
    Prisma -->|"prisma generate"| Client["Cliente TS\nautogenerado"]

    style SQL fill:#9e6a03,stroke:#d29922,color:#fff
    style BD fill:#238636,stroke:#3fb950,color:#fff
    style Prisma fill:#1f6feb,stroke:#58a6ff,color:#fff
    style Client fill:#8957e5,stroke:#bc8cff,color:#fff
```

---

## Modelos (17 tablas)

### Catálogo (5)

| Tabla | Descripción |
|---|---|
| `menu_items` | Ítems del menú (platos y combos) |
| `menu_item_tags` | Etiquetas para clasificar |
| `menu_item_tagging` | N:M ítems ↔ etiquetas |
| `menu_item_ingredients` | Receta: insumos por ítem |
| `combo_description` | Composición de combos |

### Inventario (5)

| Tabla | Descripción |
|---|---|
| `internal_supplies` | Insumos (código único, stock min/max, UOM) |
| `internal_supply_tags` | Etiquetas de insumos |
| `supply_tagging` | N:M insumos ↔ etiquetas |
| `units_of_measurement` | Unidades de medida (kg, L, unid) |
| `storage_rooms` | Ubicaciones de almacenamiento |
| `internal_supplies_location` | Stock por insumo × ubicación |

### Proveedores (3)

| Tabla | Descripción |
|---|---|
| `suppliers` | Proveedores (RUC único, razón social) |
| `supplier_catalog_items` | Catálogo por proveedor (precio, factor) |
| `supplier_contact_methods` | Contactos (email, teléfono, WhatsApp) |

### Pedidos (3)

| Tabla | Descripción |
|---|---|
| `restaurant_table` | Mesas (token QR) |
| `customer_order` | Pedidos (estado, pago, tipo) |
| `customer_order_items` | Detalle del pedido |

---

## Enums (8)

| Enum | Valores |
|---|---|
| `contact_method_type` | `email` · `phone` · `WhatsApp` |
| `customer_order_item_status_type` | `pending` · `preparing` · `finished` |
| `customer_order_payment_status_type` | `pending` · `paid` |
| `customer_order_status_type` | `pending` · `preparing` · `on the way` · `delivered` |
| `customer_order_type` | `dine in` · `take out` · `delivery` |
| `menu_item_status_type` | `available` · `out of stock` · `discontinued` |
| `menu_item_type` | `combo` · `item` |
| `restaurant_table_status_type` | `available` · `occupied` |

---

## Convenciones de naming

- **Snake case** para tablas y columnas
- **Singular** para nombres de tabla
- Primary keys: `{tabla}_id` con `GENERATED ALWAYS AS IDENTITY`
- Foreign keys: `{tabla_origen}_{columna}_fk`
- Unique constraints: `{tabla}_unique`

---

## Workflow de cambios

```
1. Editas database/scripts/schema/schema.sql
2. Aplicas el cambio a la BD (psql o pgAdmin)
3. Sincronizas Prisma:
   npx prisma db pull
   npx prisma generate
4. Commiteas schema.prisma + generated/
```

---

[&larr; Anterior: Arquitectura](./03-arquitectura.md) | [Siguiente: Docker &rarr;](./05-docker.md)
