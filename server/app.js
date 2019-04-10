import express from "express";
import bodyParser from "body-parser";
import accountRoutes from "./routes/account";
import authRoutes from "./routes/index";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/v1", accountRoutes);
app.use("/api/v1", authRoutes);

export default app;
