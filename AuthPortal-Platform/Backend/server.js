import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import "./Models/db.js";
import AuthRouter from "./Routes/AuthRouter.js";
import ProductRouter from "./Routes/ProductRouter.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/about", (req, res) => {
    res.send("About Page");
});

app.use("/auth", AuthRouter);
app.use("/product", ProductRouter);

// Global JSON error handler — never returns HTML
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error",
        success: false
    });
});

// 404 fallback — only for truly unknown routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found", success: false });
});

const Port = process.env.PORT || 8080;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
});

export default app;
