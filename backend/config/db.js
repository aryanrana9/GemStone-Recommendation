const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/astrogem';
    const conn = await mongoose.connect(connUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Do not exit the process immediately so that developers can still view local endpoints
    // or run mock configurations without a running local DB.
    console.log('Backend will continue running in mock/demo fallback mode if database queries fail.');
  }
};

module.exports = connectDB;
