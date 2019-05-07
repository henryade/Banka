<<<<<<< HEAD
import debug from "debug";
=======
import dotenv from "dotenv";
>>>>>>> ch-refactor-165853483
import app from "./app";

dotenv.config();


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running at port:${port}...`);
});
