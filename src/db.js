import JSONdb from "simple-json-db";
import path from "path";

const dbFile = path.join(__dirname, "database.json");
const db = new JSONdb(dbFile);

export default db;
