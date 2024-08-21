import dotEnv from 'dotenv'
import { connect } from "mongoose";
dotEnv.config();
console.log(process.env.DB_URI);
const dbConn = connect(process.env.DB_URI)
.then(() => {
  console.log("dataBase connected successfully...");
})
.catch(() => {
  console.error("error dataBase connection!");
});

export default dbConn;
