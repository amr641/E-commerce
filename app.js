import express from "express";
import dbConn from "./src/config/dbConfig.js";
import bootstrab from "./src/bootstrab.js";
import fs from "fs";
const app = express();
const port = 3000;
// body-parser
app.use(express.json());
app.use("/uploads", express.static("uploads"));
bootstrab(app);
// check if file uploads exists or not
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./src/uploads");
  console.log("File created.");
}

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`app listening on port ${port}!`));
