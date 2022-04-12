const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51Kf51aI2JkkqccUmMhElq3aLS7Ke9KyCTIC8qx7loLnnC8VZSQ2CJEAppqfst0msTcCnFx7P7YbMTSLXgjcGsqbQ009qxmW513');
// backend is in node.js
// do npm i express ,  npm i cors, npm i stripe
// to check if your api works before you deploy it you do firebase emulators:start  gives u a function url with the logs and a url endpoint link for the api this where you check if returned what you wanted to the dummy route( this link is at functions[api])
// the link for the dummy route/ local api endpoint -http://localhost:5001/cloneweb-90b6f/us-central1/api
// sometimes got to restart the backend when it looks like it crashes or has problem loading by doing firebase emulators:start
// Do firebase deploy --only functions   to deploy only functions might have to change the predeploy in firebase json if it doesnt work
//then when deploying the frontend firebase deploy --only hosting after doing npm run build
// use cd.. to go back a file
// // Create and Deploy Your First Cloud Functions

// // https://firebase.google.com/docs/functions/write-firebase-functions
//App config
const app = express();

//Middlewares
app.use(cors({ origin: true }));

//for secruity 
app.use(express.json());
//allows you to send data in json format


// API Routes 
app.get("/", (request, response) => response.status(200).send("hello world"));

//creates an api/dummy route that sends 200 request and hello world if it works
app.post("/payments/create", async (request, response) => {
    // /paymet/create is a call back to the url we called in the payment.js file 
    const total = request.query.total;
  // this is how you access the total in the query/url from payment 
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
        // getting the paymentIntent from stripe 
      amount: total, // subunits of the currency
      currency: "usd",// the currency we are using 
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });

//Listen commands 
exports.api = functions.https.onRequest(app);
//where the cloud functions come into play 

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
