# Inventory Management System

This project is an Inventory Management System built with Next.js, Prisma, and PostgreSQL, providing a streamlined platform for managing and analyzing products data effectively.

## Table of Contents

- [Getting Started](#getting-started)
- [File Structure](#file-structure)
- [Available Scripts](#available-scripts)
- [Technology Stack](#technology-stack)
- [Database](#database)
- [Features](#features)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)

## Getting Started

To start the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open http://localhost:3000 in your browser to see the project running.

Setup
Clone this repository and navigate to the project folder.

Install the dependencies:
npm install

Configure environment variables for PostgreSQL and Prisma in a .env file.
To update the database schema, run:

File Structure
app/: Contains application pages, with each page updating in real-time on edit.
components/: Custom reusable components.
prisma/: Contains schema definition for the database.
public/: Static files such as images.
styles/: Global styles.
utils/: Helper functions.
Available Scripts
npm run dev: Starts the development server.
npm run build: Builds the application for production.
npm start: Starts the production server.
npx prisma db push: Updates the database schema.
npx prisma studio: Launches Prisma Studio for database visualization.
Technology Stack
Frontend: Next.js with TypeScript
Backend: Prisma ORM, PostgreSQL for database management
UI Components: Tailwind CSS, Lucide Icons, and Recharts for analytics
Deployment: Vercel
Database
Uses PostgreSQL as the database, managed through Prisma ORM, for efficient data handling.

Features
Laptop Analytics: Analyze and visualize key metrics, including average price, rating, and brand performance.
CSV Upload: Supports file upload for batch data handling.
Responsive Design: Mobile-friendly layout.
