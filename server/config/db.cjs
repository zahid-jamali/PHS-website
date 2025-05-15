const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    // In development, we'll use the DATABASE_URL from Replit if available
    const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || 'mongodb://localhost:27017/phs_db';
    
    console.log(`Attempting MongoDB connection to: ${mongoUri.substring(0, mongoUri.indexOf('?') > 0 ? mongoUri.indexOf('?') : 15)}...`);
    
    const conn = await mongoose.connect(mongoUri, {
      // Note: mongoose v6+ doesn't require these options anymore,
      // they're included for backward compatibility and clarity
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    // In development, don't exit the process
    if (process.env.NODE_ENV === 'production') {
      // Exit process with failure in production
      process.exit(1);
    }
    
    console.log('Continuing without MongoDB connection in development mode');
    return false;
  }
};

module.exports = connectDB;