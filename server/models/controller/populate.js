import dbs from "../db/db";
import { CREATETABLES } from "./index";

const execute = async () => {
  dbs.createTable(CREATETABLES);
};
execute();
