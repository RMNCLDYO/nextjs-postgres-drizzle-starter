# NextJS Database Starter Kit

A modern, full-stack starter kit featuring Next.js 15, React 19, Tailwind CSS v4, and Drizzle ORM with PostgreSQL. Includes pre-configured database migrations, Biome for code quality, and shadcn/ui components for rapid UI development.

## Template Status

This is a starter template providing the foundational structure and configuration. It includes:

- ✅ Complete project structure and configuration
- ✅ Database schema and migration setup
- ✅ Styling system with theme configuration
- ✅ Code quality tools integration
- ✅ Comprehensive database management tools

Developers will need to implement:

- 🔄 UI components using the shadcn/ui system
- 🔄 Database interaction from the UI
- 🔄 API routes or server actions
- 🔄 Authentication and authorization

## Features

- 🚀 **Next.js 15** with App Router and Server Components
- ⚛️ **React 19** with newest features and optimizations
- 🎨 **Tailwind CSS v4** with enhanced styling capabilities
- 🧰 **shadcn/ui** components for beautiful UI elements
- 🗄️ **Drizzle ORM** with PostgreSQL for type-safe database operations
- 📊 **Database Migrations** pre-configured for easy schema changes
- 🔍 **Biome** for consistent code formatting and linting
- 🌓 **Dark Mode** support with a beautiful color system
- 📱 **Responsive Design** out of the box
- 🛠️ **Complete Database Tooling** for development, testing, and production

## Prerequisites

- Node.js 18+ 
- PNPM 8+
- PostgreSQL database (Supabase, Neon, etc...)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rmncldyo/nextjs-database-starter-kit.git
cd nextjs-database-starter-kit
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root of your project based on the provided `example.env`:

```
# PostgreSQL Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# Node Environment (development, production, test)
NODE_ENV=development
```

**Note:** SSL configuration is handled automatically based on your environment:
- In development (`NODE_ENV=development`), self-signed certificates are accepted
- In production (`NODE_ENV=production`), strict certificate validation is enforced

### 4. Set up your database

```bash
# Push the schema to your database
pnpm db:push

# Seed with initial data
pnpm db:seed

# Or for a full setup (schema + seed data)
pnpm db:reset
```

### 5. Start the development server

```bash
pnpm dev
```

Visit http://localhost:3000 to see your application.

## Project Structure

```
├── app/                # Next.js App Router files
│   ├── page.tsx        # Main landing page
│   ├── layout.tsx      # Root layout with font configuration
│   └── globals.css     # Global styles with Tailwind v4 config
├── lib/                # Utility functions and shared logic
│   ├── db/             # Database configuration and schema
│   │   ├── index.ts    # Database connection setup
│   │   ├── schema.ts   # Table definitions and relationships
│   │   ├── migrate.ts  # Migration script
│   │   ├── seed.ts     # Database seeding
│   │   ├── clear.ts    # Complete database reset
│   │   ├── backup.ts   # Database backup utility
│   │   └── migrations/ # Generated SQL migrations
│   └── utils.ts        # Helper utilities for styling
├── public/             # Static assets
├── components/         # (To be implemented) UI components
├── backups/            # Database backups (git-ignored)
├── drizzle.config.ts   # Drizzle ORM configuration
├── biome.json          # Biome formatter and linter config
└── components.json     # shadcn/ui components configuration
```

## Database Usage

This starter uses Drizzle ORM with PostgreSQL. The database schema is defined in `lib/db/schema.ts` with the following structure:

```typescript
// Current schema: Users table
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
```

### Database Commands

The kit includes a comprehensive set of database management commands:

```bash
# Schema Management
pnpm db:push         # Push schema changes directly to the database
pnpm db:generate     # Generate a new migration
pnpm db:migrate      # Apply migrations
pnpm db:studio       # Start Drizzle Studio to manage your database
pnpm db:check        # Check for schema changes without applying them
pnpm db:pull         # Pull schema from an existing database
pnpm db:up           # Apply pending migrations up to a specific version

# Environment-specific Operations
pnpm db:push:dev     # Push schema with development environment settings
pnpm db:push:prod    # Push schema with production environment settings

# Data Management
pnpm db:seed         # Populate database with initial sample data
pnpm db:clear        # Reset database by dropping all tables, views, functions, etc.
pnpm db:reset        # Clear database and reseed with fresh data
pnpm db:backup       # Create a JSON backup of database data
pnpm db:types        # Generate TypeScript types from database schema
```

## Adding UI Components

This starter kit is configured for use with shadcn/ui components. To add a component:

1. Use the shadcn/ui CLI (recommended to install it globally):
   ```bash
   pnpm install -g shadcn-ui@latest
   ```

2. Add components to your project:
   ```bash
   npx shadcn-ui@latest add button
   npx shadcn-ui@latest add card
   # etc.
   ```

3. Components will be added to the `components/ui` directory automatically.

4. Import and use them in your pages:
   ```tsx
   import { Button } from "@/components/ui/button";
   ```

Visit [shadcn/ui documentation](https://ui.shadcn.com/docs) for more details.

## Available Scripts

- `pnpm dev` - Start the development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Lint and format the codebase using Biome
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format code using Biome

## Styling

This project uses Tailwind CSS v4 with a custom theme configuration. The theme is defined in `app/globals.css` and uses the new oklch color format for better color representation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Biome](https://biomejs.dev/)
