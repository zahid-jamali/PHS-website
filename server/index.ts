// This TypeScript file is a simple bridge to our CommonJS server
// It dynamically imports and runs our server.cjs file

// Set environment variable
process.env.NODE_ENV = 'development';

// Use dynamic import to load our CommonJS server
// This allows TypeScript to import a CommonJS module in an ESM context
import('child_process').then(({ execSync }) => {
  console.log('Starting Dr. Abdul PHS backend server...');
  try {
    // Execute the CommonJS server file directly 
    execSync('node server/server.cjs', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
});