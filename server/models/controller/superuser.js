import bcrypt from "bcryptjs";
import dbs from "../db/db";
import { CREATETABLES } from "./index";

const execute = async () => {
  const hash = bcrypt.hashSync(process.env.superuserPassword, 10);
  const res = await dbs.createTable(CREATETABLES);
  const query = {
    text: "INSERT INTO users(\"firstName\",\"lastName\",email,password,type,\"isAdmin\") VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    values: [
      process.env.firstName,
      process.env.lastName,
      process.env.superuserEmail,
      hash,
      "staff",
      true,
    ],
  };
  if (res === undefined) {
    await dbs.insertTable(query);
  }
};
execute();
export default execute;
