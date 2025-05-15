# Dr. Abdul PHS Website - Deployment Instructions

This document provides instructions for deploying the Dr. Abdul PHS Website application, a full-stack e-commerce platform for Pink Himalayan Salt products.

## Project Overview

The application is built with:
- **Frontend**: React with Vite, Tailwind CSS, and Shadcn UI components
- **Backend**: Express.js API server
- **Database**: PostgreSQL using Drizzle ORM
- **Features**: Multi-language support, WebSocket chat, product catalog, user management, admin controls, etc.

## Prerequisites

- Node.js v16.x or higher
- PostgreSQL v12.x or higher
- npm or yarn package manager

## Deployment Steps

### 1. Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE dr_abdul_phs;
   ```

2. Set up environment variables for the database connection:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/dr_abdul_phs
   ```

3. Run the database migration:
   ```bash
   npm run db:push
   ```

### 2. Install Dependencies

1. Install project dependencies:
   ```bash
   npm install
   ```

### 3. Build the Application

1. Build the frontend and backend:
   ```bash
   npm run build
   ```

This will:
- Compile the TypeScript backend code
- Bundle the React frontend application
- Generate all necessary assets

### 4. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dr_abdul_phs

# Application
NODE_ENV=production
PORT=3000

# Session
SESSION_SECRET=your-secure-secret-key

# For Stripe (if implemented)
STRIPE_SECRET_KEY=your-stripe-secret-key
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key

# For WebSocket
WS_PATH=/ws
```

### 5. Start the Production Server

1. Start the application:
   ```bash
   npm run start
   ```

Or use a process manager like PM2:
```bash
pm2 start npm --name "dr-abdul-phs" -- run start
```

## Deployment on Hostinger

For deployment on Hostinger:

1. Create a new hosting account and set up a new website
2. Make sure Node.js hosting is enabled
3. Upload the application files using FTP or Git
4. Set up the environment variables in the Hostinger control panel
5. Run the database migrations
6. Start the application using the Hostinger Node.js hosting control panel

## Maintenance and Updates

- To update the application, redeploy the updated code and run any necessary migrations
- Regularly back up the PostgreSQL database
- Monitor server logs for any errors or issues

## Additional Information

- The application includes a built-in admin panel at `/admin` (requires admin login)
- User authentication and role-based access control are implemented
- Multi-language support for English, Arabic, and Chinese is available
- WebSocket-based live chat functionality is implemented

## Support

For technical support or questions, please contact the development team.

---

© 2025 Dr. Abdul PHS. All rights reserved.