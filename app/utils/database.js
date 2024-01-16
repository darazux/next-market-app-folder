// app/utils/database.js

import mongoose from 'mongoose';

const connectDB = async () => {
  const mongodb_uri = process.env.MONGODB_URI;
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  try {
    await mongoose.connect(
      `mongodb+srv://${username}:${password}@${mongodb_uri}`,
    );
    console.log('Success: Connected to MongoDB');
  } catch (error) {
    console.log('Failure: Unconnected to MongoDB');
    console.log(error);
    throw new Error();
  }
};

export default connectDB;
