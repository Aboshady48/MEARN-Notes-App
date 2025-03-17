import mongoose from "mongoose";

export const CreateDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully `);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};
