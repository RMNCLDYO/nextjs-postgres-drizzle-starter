# NextJS Database Starter Kit

A modern, full-stack starter kit featuring Next.js 15, React 19, Tailwind CSS v4, and Drizzle ORM with PostgreSQL. Includes pre-configured database migrations, Biome for code quality, and shadcn/ui components for rapid UI development.

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
- PostgreSQL database

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/nextjs-database-starter-kit.git
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
├── components/         # UI components
├── lib/                # Utility functions and shared logic
│   ├── db/             # Database configuration and schema
│   └── utils/          # Helper utilities
├── public/             # Static assets
└── drizzle/            # Database migrations
```

## Database Usage

This starter uses Drizzle ORM with PostgreSQL. The database schema is defined in `lib/db/schema.ts`.

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
