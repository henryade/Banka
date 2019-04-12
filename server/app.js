import express from "express";
import bodyParser from "body-parser";
import accountRoutes from "./routes/account";
import transactionRoutes from "./routes/transaction";
import authRoutes from "./routes/index";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Home Page");
});
app.get("*", (req, res) => {
  res.send("Banka - Invalid Route ");
});
app.post("*", (req, res) => {
  res.send("Banka - Invalid Route ");
});
app.delete("*", (req, res) => {
  res.send("Banka - Invalid Route ");
});
app.put("*", (req, res) => {
  res.send("Banka - Invalid Route ");
});
app.patch("*", (req, res) => {
  res.send("Banka - Invalid Route ");
});


app.use("/api/v1", transactionRoutes);
app.use("/api/v1", accountRoutes);
app.use("/api/v1", authRoutes);

export default app;
