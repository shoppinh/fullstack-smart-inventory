# Smart Inventory Management System

A modern, full-stack inventory management system for supply chains built with NextJS, TailwindCSS, Shadcn UI, Zustand, and Drizzle ORM.

## Features

- Real-time inventory tracking
- Product management
- Supplier management
- Location/warehouse management
- Inventory transactions
- Material Design inspired UI with orange/dark theme
- Responsive layout for desktop and mobile

## Tech Stack

- **Frontend:**
  - Next.js 14 with App Router
  - TypeScript
  - TailwindCSS for styling
  - Shadcn UI components
  - Zustand for state management
  - Material Design principles

- **Backend:**
  - Drizzle ORM
  - PostgreSQL database
  - Next.js API routes

## Frontend-Backend Connection

The application uses a service-based architecture to connect the frontend React components with the backend API routes:

1. **Service Layer**: Each entity (products, suppliers, inventory) has a corresponding service file in `src/lib/services/` that handles API requests
2. **API Routes**: Next.js API routes in `src/app/api/` implement CRUD operations for each entity
3. **Database Connection**: API routes use Drizzle ORM to interact with the PostgreSQL database

Here's a diagram of how the different layers interact:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │     │                 │
│  React UI       │────▶│  Service Layer  │────▶│  API Routes     │────▶│  Database       │
│  (Components)   │     │  (API Clients)  │     │  (Controllers)  │     │  (Drizzle ORM)  │
│                 │◀────│                 │◀────│                 │◀────│                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘     └─────────────────┘
```

Key connections:
- **UI Components** use React hooks (`useState`, `useEffect`) to manage state and call service methods
- **Service Layer** abstracts API calls, handles error conditions, and formats data for the UI
- **API Routes** implement business logic, validate inputs, and execute database operations
- **Drizzle ORM** provides type-safe database interactions with PostgreSQL

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/shoppinh/fullstack-smart-inventory.git
   cd fullstack-smart-inventory
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory:
   ```
   DATABASE_URL=postgresql://postgres:password@localhost:5432/inventory
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js App Router
  - `/api` - API Routes for backend functionality
  - `/dashboard` - Dashboard UI pages
  - `/auth` - Authentication pages
- `/src/components` - UI components
- `/src/db` - Database schema and configuration
- `/src/lib` - Utility functions and shared code
  - `/services` - API service classes for frontend-backend communication
- `/src/store` - Zustand state management

## Database Schema

The database includes the following tables:
- Products
- Categories
- Suppliers
- Inventory
- Locations
- Transactions

## Screenshots

(Screenshots will be added as the project progresses)

## License

MIT

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Drizzle ORM](https://orm.drizzle.team/)
