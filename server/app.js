import express from "express";
import bodyParser from "body-parser";
import accountRoutes from "./routes/account";
import transactionRoutes from "./routes/transaction";
import authRoutes from "./routes/index";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", transactionRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", authRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.use("*", (req, res, next) => {
  const err = new Error("Page Not Found");
  res.status(404).json({
    status: 404,
    message: "Page Not Found",
  });
});

export default app;
