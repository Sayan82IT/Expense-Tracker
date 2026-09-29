import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sayankbanik675_db_user:tukai798@cluster0.iorl9kk.mongodb.net/Expense")
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err);
        });
}