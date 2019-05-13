import dbs from "../db/db";
import { POPULATETABLES } from "./index";

const execute = async () => {
  dbs.createTable(POPULATETABLES);
};
execute();