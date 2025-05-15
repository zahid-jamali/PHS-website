// Manually starting our server using Node.js
// This will bypass the TypeScript transpilation and run our CommonJS server

// Set environment variable
process.env.NODE_ENV = 'development';

// Import our server
require('./server/index.cjs');