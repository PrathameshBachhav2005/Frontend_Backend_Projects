import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import mongodb from "./Models/db.js"
import AuthRouter from "./Routes/AuthRouter.js"
import ProductRouter from "./Routes/ProductRouter.js"

const app = express();
app.use(cors());
app.use(bodyParser.json());
// mongodb();
app.get("/about", (req, res) => {
    res.send("About Page");
});

app.use("/auth", AuthRouter);
app.use("/product", ProductRouter);

const Port = process.env.PORT || 8080;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})

export default app;