-- Initialization Script 01: Users

-- This script will be executed to do further initialization before starting the postgres service
-- For more information visit: https://hub.docker.com/_/postgres#initialization-scripts

-- The further initialization that this script registers is about the creation of 2 ESSENCIAL USERS

-- 1. The DB Admin User: A user that will have all privileges on the turtle database.
--    This user will be used on the pgAdmin
CREATE USER db_admin WITH PASSWORD 'admin_password' CREATEDB CREATEROLE;
GRANT ALL PRIVILEGES ON DATABASE turtledb TO db_admin;
GRANT ALL ON SCHEMA public TO db_admin;
-- 2. The Prisma User: A user that will be used by the prisma client ONLY.
-- Therefore, it will only have the necessary privileges for the tasks it will do.
CREATE USER prisma_user WITH PASSWORD 'prisma_password';
GRANT CONNECT ON DATABASE turtledb TO prisma_user;
GRANT USAGE ON SCHEMA public TO prisma_user;
GRANT CREATE ON SCHEMA public TO prisma_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO prisma_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO prisma_user;
ALTER DEFAULT PRIVILEGES FOR ROLE db_admin IN SCHEMA public GRANT ALL ON TABLES TO prisma_user;
ALTER DEFAULT PRIVILEGES FOR ROLE db_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO prisma_user;