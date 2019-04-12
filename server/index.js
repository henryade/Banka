import app from "./app";
// eslint-disable-next-line import/named
import { Port } from "./config";

const port = process.env.PORT || Port;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at port:${port}...`);
});
