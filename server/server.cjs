const express = require("express");
const http = require("http");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/db.cjs");
const { errorMiddleware } = require("./utils/errorHandler.cjs");
const { ChatService } = require("./utils/chatService.cjs");

// Import routes
const productRoutes = require("./routes/productRoutes.cjs");
const userRoutes = require("./routes/userRoutes.cjs");
const orderRoutes = require("./routes/orderRoutes.cjs");
const contactRoutes = require("./routes/contactRoutes.cjs");
const saltFlavorRoutes = require("./routes/saltFlavorRoutes.cjs");

// Load environment variables
dotenv.config();

// Connect to MongoDB - async function with proper error handling
async function setupServer() {
  // Wait for database connection
  const dbConnected = await connectDB();

  // Log connection status
  if (dbConnected) {
    console.log("MongoDB connection established");
  } else {
    console.log("Running without database connection in development mode");
  }
}

// Start the setup process
setupServer();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Mount routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/salt-flavors", saltFlavorRoutes);

// Authentication check endpoint
app.get("/api/auth/user", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// API status endpoint - useful for testing
app.get("/api/status", (req, res) => {
  res.json({
    status: "success",
    message: "Dr. Abdul PHS API is running",
    timestamp: new Date(),
    env: process.env.NODE_ENV,
    dbStatus: mongoose.connection.readyState ? "connected" : "disconnected",
  });
});

// Handle static files and SPA routes
// if (process.env.NODE_ENV === "production") {
// Check multiple possible static file locations
// const possiblePaths = [
//   path.join(__dirname, "../dist"),
//   path.join(__dirname, "../public"),
//   path.join(__dirname, "../client/dist"),
//   path.join(__dirname, "../client/build"),
// ];

// // Try to find where the static files are built
// let staticPath = null;
// for (const dir of possiblePaths) {
//   try {
//     if (require("fs").existsSync(dir)) {
//       console.log(`Found static files in: ${dir}`);
staticPath = path.join(__dirname, "../dist/public/"); //dir;
//       break;
//     }
//   } catch (err) {
//     // Continue to next path
//   }
// }

if (staticPath) {
  // Serve static files from the found directory
  app.use(express.static(`${staticPath}`));

  // Add special case for the root path
  app.get("/", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Send the index.html for any non-API requests in production
  app.get(/^(?!\/api\/).+/, (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  console.warn(
    "No static files directory found. Frontend will not be served properly."
  );

  // Create a simple index.html for the root route when no static files exist
  app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Dr. Abdul PHS</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: #0066cc; }
            .container { max-width: 800px; margin: 0 auto; }
            .message { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Dr. Abdul PHS - Pink Himalayan Salt</h1>
            <div class="message">
              <p>The API server is running, but the frontend static files were not found.</p>
              <p>API Status: <a href="/api/status">Check API Status</a></p>
              <p>Build the frontend or place the files in one of these locations:</p>
              <ul style="text-align: left; display: inline-block;">
                ${possiblePaths.map((p) => `<li>${p}</li>`).join("")}
              </ul>
            </div>
          </div>
        </body>
        </html>
      `);
  });
}
// } else {
//   // In development, we'll only handle API requests
//   // The Vite dev server will handle all other requests
//   console.log("Running in development mode - API server only");
// }

// Error handling middleware
app.use(errorMiddleware);

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket chat service
const chatService = new ChatService(server);

// Set the port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
