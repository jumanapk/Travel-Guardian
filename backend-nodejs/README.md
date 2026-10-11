# Travel Guard — Express & Prisma Backend

This directory contains the production-ready Node.js, Express, and Prisma ORM backend architecture designed for deployment with PostgreSQL or Supabase.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Prisma ORM
- **Database**: PostgreSQL (or Supabase Postgres)
- **Validation**: Zod
- **Authentication**: JWT & bcrypt

## Quick Start (When Node.js is installed)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env` and fill in your PostgreSQL connection string:
   ```bash
   cp .env.example .env
   ```

3. **Run Prisma Migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Seed Demo Data**:
   ```bash
   npm run prisma:seed
   ```

5. **Start Dev Server**:
   ```bash
   npm run dev
   ```

The API will listen at `http://localhost:5000/api`.
