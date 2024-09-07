import express from 'express';
import dotEnv from 'dotenv';
import dbConn from './config/dbConfig.js';
import bootstrab from './bootstrab.js';
import fs from 'fs';
import cors from 'cors';
import { catchError } from './middlewares/catchErrors.js';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPT_SECRET_KEY);

const app = express();
const port = process.env.PORT || 8080;
// body-parser
app.use(cors());
// stripe webhook

app.post(
  '/api/webhook',
  express.raw({ type: 'application/json' }),
  catchError((req, res) => {
    const sig = req.headers['stripe-signature'].toString();

    let event;

    event = stripe.webhooks.constructEvent(req.body, sig, "whsec_wevqhq52rlCK216ws4v5Al4XGM69ikHf");

    // Handle the event
    let checkoutSessionCompleted ; 
    if(event.type == "checkout.session.completed"){
       checkoutSessionCompleted = event.data.object;
    }
 

    // Return a 200 res to acknowledge receipt of the event
    res.json({details:checkoutSessionCompleted});
  })
);
app.use(express.json());
// app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
dotEnv.config();

bootstrab(app);
// check if file uploads exists or not
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./src/uploads');
  console.log('File created.');
}
app.listen(port, () => console.log(`app listening on port ${port}!`));
