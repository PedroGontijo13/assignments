import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import header from "./middleware/header.js";
import todoRoutes from "./routes/todo.js";

const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(header);

app.use("/", todoRoutes);

app.listen(5001, () => {
    console.log("Server is running on port 5001");
})