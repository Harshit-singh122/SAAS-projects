import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://singhunny222_db_user:invoice123@cluster0.lxcz3qj.mongodb.net/InvoiceAI')
  .then(() => {
    console.log("MongoDB connected successfully");
    })
}