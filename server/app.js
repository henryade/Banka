import express from "express";
import bodyParser from "body-parser";
import Cors from "cors";
import accountRoutes from "./routes/account";
import transactionRoutes from "./routes/transaction";
import authRoutes from "./routes/index";
import userRoutes from "./routes/user";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Cors());

app.use("/api/v1", transactionRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "Page Not Found",
  });
});

export default app;
