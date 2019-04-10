import app from "./app";
// eslint-disable-next-line import/named
import { port } from "./config";

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running at port:${port}...`);
});
