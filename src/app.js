import express from 'express';
import dotEnv from 'dotenv';
import dbConn from './config/dbConfig.js';
import bootstrab from './bootstrab.js';
import fs from 'fs';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;
// body-parser
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
dotEnv.config();

bootstrab(app);
// check if file uploads exists or not
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./src/uploads');
  console.log('File created.');
}
app.listen(port, () => console.log(`app listening on port ${port}!`));
