# NextJS Database Starter Kit

A modern, full-stack starter kit featuring Next.js 15, React 19, Tailwind CSS v4, and Drizzle ORM with PostgreSQL. Includes pre-configured database migrations, Biome for code quality, and shadcn/ui components for rapid UI development.

## Template Status

This is a starter template providing the foundational structure and configuration. It includes:

- ✅ Complete project structure and configuration
- ✅ Database schema and migration setup
- ✅ Styling system with theme configuration
- ✅ Code quality tools integration

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

Create a `.env` file in the root of your project:

```
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/your_database
```

**Note:** SSL is enabled by default for database connections. If you're using a local development database without SSL, you'll need to modify `lib/db/index.ts` to disable SSL.

### 4. Set up your database

```bash
# Push the schema to your database
pnpm db:push

# Or if you want to generate migrations
pnpm db:generate
pnpm db:migrate
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
│   │   ├── index.ts    # Database connection and CRUD setup
│   │   ├── schema.ts   # Table definitions and relationships
│   │   └── migrations/ # Generated SQL migrations
│   └── utils.ts        # Helper utilities for styling
├── public/             # Static assets
├── components/         # (To be implemented) UI components
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

```bash
# Push schema changes directly to the database
pnpm db:push

# Generate a new migration
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Start Drizzle Studio to manage your database
pnpm db:studio
```

## Adding UI Components

This starter kit is configured for use with shadcn/ui components. To add a component:

1. Use the shadcn/ui CLI (recommended to install it globally):
   ```bash
   npm install -g shadcn-ui@latest
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
- `pnpm lint` - Lint the codebase using Biome

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
