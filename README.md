
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://img.icons8.com/fluency/96/turtle.png">
    <img src="https://img.icons8.com/color/96/turtle.png" width="120" alt="TURTLE Logo" />
  </picture>
</p>

<h1 align="center">🐢 TURTLE Backend</h1>

<p align="center">
  <em>Restaurant Inventory & Operations Management API</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white" alt="Jest" />
</p>

---

## 📋 Table of Contents

- [About](#-about)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Scripts](#-scripts)
- [Testing](#-testing)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## 🧩 About

**TURTLE** is a backend service designed for restaurant management — handling inventory, supplies, stock, warehouse locations, suppliers, menu items, and customer orders.

Built with **NestJS** and **Prisma** on **PostgreSQL**, the API provides a clean modular foundation that can scale from a single restaurant to a multi-branch operation.

The name **TURTLE** reflects the philosophy: *reliable, steady, and built to last*.

---

## ⚙️ Tech Stack

| Technology | Purpose |
|---|---|
| [NestJS](https://nestjs.com/) v11 | Application framework |
| [TypeScript](https://www.typescriptlang.org/) v5 | Language |
| [Prisma](https://www.prisma.io/) v7 | ORM & database client |
| [PostgreSQL](https://www.postgresql.org/) 18 | Database |
| [Docker](https://www.docker.com/) / [Compose](https://docs.docker.com/compose/) | Local infrastructure |
| [pgAdmin](https://www.pgadmin.org/) 4 | Database administration UI |
| [Jest](https://jestjs.io/) v30 | Testing framework |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   NestJS App                     │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐   │
│  │ Inventory  │  │  Prisma   │  │  Config   │   │
│  │  Module    │  │  Module   │  │  Module   │   │
│  └─────┬─────┘  └─────┬─────┘  └───────────┘   │
│        │              │                          │
│  ┌─────┴──────────────┴─────┐                    │
│  │     WarehouseModule      │                    │
│  │  ┌──────────────────┐    │                    │
│  │  │ WarehouseController│   │                    │
│  │  ├──────────────────┤    │                    │
│  │  │ WarehouseService  │    │                    │
│  │  └──────────────────┘    │                    │
│  └──────────────────────────┘                    │
│  ┌───────────┐  ┌───────────┐                    │
│  │ Supplies  │  │   Stock   │                    │
│  │  Module   │  │  Module   │  ← Scaffolded      │
│  └───────────┘  └───────────┘                    │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────┐
│             PostgreSQL (via Prisma)              │
│  ┌──────────┐ ┌──────────┐ ┌────────────────┐   │
│  │warehouses│ │menu_items│ │internal_supplies│   │
│  ├──────────┤ ├──────────┤ ├────────────────┤   │
│  │  ...     │ │  orders  │ │   suppliers    │   │
│  └──────────┘ └──────────┘ └────────────────┘   │
└──────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22
- **npm** ≥ 10
- **Docker** & **Docker Compose** (for PostgreSQL)

### 1. Clone & Install

```bash
git clone <repo-url>
cd TURTLE-Backend
npm install
```

### 2. Configure Environment

Copy the template and adjust if needed:

```bash
cp .env.template .env
```

### 3. Start the Database

```bash
docker compose up -d
```

> Starts PostgreSQL on port `5432` (configurable via `.env`).  
> Optionally, launch pgAdmin with: `docker compose --profile dbClient up -d`

### 4. Push Schema & Generate Client

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the Server

```bash
# development
npm run start

# watch mode (auto-reload)
npm run start:dev

# production
npm run start:prod
```

The API will be available at [http://localhost:3000](http://localhost:3000).

---

## 🌱 Environment Variables

| Variable | Default | Description |
|---|---|---|
| `DATABASE_URL` | `postgresql://prisma_user:prisma_password@localhost:5432/turtledb` | Prisma datasource URL |
| `HOST_POSTGRES_PORT` | `5432` | Host port for PostgreSQL |
| `POSTGRES_USER` | `postgres` | PostgreSQL superuser |
| `POSTGRES_PASSWORD` | *(auto-generated)* | Superuser password |
| `POSTGRES_DB` | `turtledb` | Database name |
| `HOST_PGADMIN_PORT` | `80` | pgAdmin web UI port |
| `PGADMIN_DEFAULT_EMAIL` | `admin@admin.com` | pgAdmin login email |
| `PGADMIN_DEFAULT_PASSWORD` | `admin_password` | pgAdmin login password |
| `PORT` | `3000` | Application HTTP port |

---

## 📡 API Endpoints

| Method | Path | Description | Status |
|---|---|---|---|
| `GET` | `/` | Health check / Hello World | ✅ |
| `GET` | `/warehouse` | List warehouses (_query: `name`, `page`_) | ✅ |
| `POST` | `/warehouse` | Create a warehouse | ✅ |
| — | `/supplies/*` | Supplies CRUD _(coming soon)_ | 🚧 |
| — | `/stock/*` | Stock management _(coming soon)_ | 🚧 |

### Example: Create a Warehouse

```bash
curl -X POST http://localhost:3000/warehouse \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Main Storage",
    "address": "Av. Principal 123",
    "description": "Downtown warehouse"
  }'
```

### Example: List Warehouses

```bash
curl "http://localhost:3000/warehouse?name=Main&page=1"
```

---

## 🗄️ Database Schema

The full schema defines **17 tables** covering the restaurant domain:

```
restaurant_table        → Dining tables & QR tokens
menu_items              → Menu with pricing, types (combo/single)
menu_item_tags          → Tag taxonomy for menu items
menu_item_ingredients   → BOM linking menu items to supplies
internal_supplies       → Inventory items with stock tracking
internal_supply_tags    → Tag taxonomy for supplies
suppliers               → Vendor registry (RUC, company)
supplier_catalog_items  → Vendor product catalog & pricing
units_of_measurement    → UOM catalog
storage_rooms           → Warehouse storage locations
internal_supplies_location → Stock per storage room
customer_order          → Orders with payments, statuses
customer_order_items    → Order line items
combo_description       → Combo item composition
```

The Prisma client is generated from `prisma/schema.prisma`.

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run start` | Start the app |
| `npm run start:dev` | Start in watch mode |
| `npm run start:prod` | Start production build |
| `npm run build` | Compile the project |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage |
| `npm run lint` | Lint and auto-fix |
| `npm run format` | Format code with Prettier |

---

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests (requires running DB)
npm run test:e2e

# with coverage
npm run test:cov
```

---

## 📁 Project Structure

```
TURTLE-Backend/
├── src/
│   ├── main.ts                    # Entry point
│   ├── app.module.ts              # Root module
│   ├── app.controller.ts          # Root controller
│   ├── app.service.ts             # Root service
│   ├── config/                    # Configuration
│   ├── inventory/
│   │   ├── inventory.module.ts
│   │   ├── warehouse/             # ✅ Implemented
│   │   │   ├── warehouse.controller.ts
│   │   │   ├── warehouse.service.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   ├── supplies/              # 🚧 Scaffolded
│   │   └── stock/                 # 🚧 Scaffolded
│   ├── prisma/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   └── generated/prisma/          # Auto-generated Prisma client
├── prisma/
│   ├── schema.prisma              # Prisma schema
│   └── config.ts                  # Prisma config
├── database/
│   └── scripts/
│       ├── initialization/        # Docker init SQL
│       ├── schema/                # Full schema DDL
│       └── seed/                  # Seed data
├── docker-compose.yml             # PostgreSQL + pgAdmin
├── .env.template                  # Environment template
├── tsconfig.json
├── nest-cli.json
├── eslint.config.mjs
└── package.json
```

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push: `git push origin feat/my-feature`
5. Open a Pull Request.

### Guidelines

- Follow the existing code style (Prettier + ESLint).
- Write tests for new functionality.
- Keep modules loosely coupled.
- Use the Prisma service for all database access.

---

<p align="center">
  Built with ❤️ using <a href="https://nestjs.com/">NestJS</a>
</p>
