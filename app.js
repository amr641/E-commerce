import express from "express";
const app = express();
const port = 3000;
import dbConn from "./src/config/dbConfig.js";
import bootstrab from "./src/bootstrab.js";
app.use(express.json());
bootstrab(app);
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
