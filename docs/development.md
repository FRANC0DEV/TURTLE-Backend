# Desarrollo

## Prerrequisitos

- Node.js 24.15.0 (ver `.nvmrc`)
- Docker + Docker Compose v2.24+
- npm

## Setup inicial

```bash
nvm use              # Usar versión de Node del .nvmrc
npm install           # Instalar dependencias
npx prisma generate   # Generar cliente Prisma
```

## Comandos disponibles

```bash
npm run start:dev     # Desarrollo con hot-reload (tsx watch)
npm run build         # Compilar TypeScript a dist/
npm run start:prod    # Correr versión compilada
npm run lint          # ESLint
npm run test          # Tests unitarios
npm run test:e2e      # Tests end-to-end
npm run format        # Prettier
```

## Workflow con Docker

El flujo de desarrollo diario:

```bash
# 1. Iniciar servicios
docker compose -f docker-compose.yml -f docker-compose.development.yml up --build --watch

# 2. Editar código en ./src/
#    → Docker sync copia los cambios al contenedor
#    → tsx watch reinicia el servidor automáticamente

# 3. Si cambias package.json
#    → Docker rebuild automático

# 4. Ver resultados
curl http://localhost:3000/
curl http://localhost:3000/health
```

## Instalar nuevas dependencias

```bash
npm install <paquete>        # Local
# Docker detecta el cambio en package.json y reconstruye
```

## Cambios en la base de datos

```bash
# 1. Editar script SQL en database/scripts/
# 2. Aplicar el cambio a la BD (psql, pgAdmin, etc.)
# 3. Sincronizar Prisma:
npx prisma db pull
npx prisma generate
# 4. Commitear schema.prisma + generated/
```

## Notas importantes

### `@Inject()` en constructores

Usamos `tsx watch` para desarrollo (hot-reload confiable). `tsx` usa esbuild, que **no soporta `emitDecoratorMetadata`**. Por lo tanto, todos los constructores deben usar `@Inject()` explícito:

```typescript
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class MiServicio {
  constructor(
    @Inject(OtroServicio) private readonly otro: OtroServicio,
  ) {}
}
```

### `reflect-metadata`

`main.ts` debe importar `reflect-metadata` al inicio:
```typescript
import 'reflect-metadata';
```

## Tests

```bash
# Unitarios
npm run test

# Cobertura
npm run test:cov

# E2E
npm run test:e2e

# En Docker
docker compose exec turtle-backend npm run test
```
