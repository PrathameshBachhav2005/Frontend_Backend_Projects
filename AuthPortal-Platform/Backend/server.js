import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import "./Models/db.js";          // triggers mongoose.connect() on import
import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from "./Routes/ProductRouter.js";
import mongoose from "mongoose";
import mongodb from "./Models/db.js"; // Import the mongodb function

mongodb(); // Call the mongodb function to connect to the database
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.use("/auth", AuthRouter);
app.use("/product", ProductRouter);

// Global error handler — always returns JSON, never HTML
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
        success: false
        });
});

// 404 handler — catch unknown routes before they return HTML
app.use((req, res) => {
    res.status(404).json({ message: "Route not found", success: false });
});

const Port = process.env.PORT || 8080;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

export default app;