import mongoose from "mongoose";

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log(error));
}

export default connectDB;
