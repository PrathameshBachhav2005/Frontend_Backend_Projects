import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGO_CONN)
    .then(() => {
        console.log("MongoDB is connected...");
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    });
