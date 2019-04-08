import express from "express";
import bodyParser from "body-parser";
import {port} from "./config";

const app = express();


app.get("/", (req,res) => {
    res.send("Home Page");
})

//////////////////////////
////// POST ROUTES///////
////////////////////////


///////////////
// Sign In ///
/////////////

app.post("/auth/signup", (req,res) => {

})

////////////////
// Sign Up ////
//////////////

app.post("/auth/signin", (req,res) => {

})

/////////////////////
// Create Account //
///////////////////

app.post("/:userId/accounts", (req,res) => {

})

/////////////////////
// Debit Account //
///////////////////

app.post("/:userId/transactions/:account-number/debit", (req,res) => {

})

/////////////////////
// Credit Account //
///////////////////

app.post("/:userId/transactions/:account-number/credit", (req,res) => {

})

//////////////////////////
////// GET ROUTES ///////
////////////////////////

///////////////////////
// All Bank Account //
/////////////////////

app.get("/:userId/accounts",(req,res) => {

})

////////////////////////////
// Specific Bank Account //
//////////////////////////

app.get("/:userId/accounts/:id",(req,res) => {

})

///////////////////////
// All User Account //
/////////////////////

app.get("/:userId/users",(req,res) => {

})

////////////////////////////
// Specific User Account //
//////////////////////////

app.get("/:userId/users/:id",(req,res) => {

})


//////////////////////////
///// UPDATE ROUTES /////
////////////////////////

//////////////////////////////////
// Activate/Deactivate Account //
////////////////////////////////

app.put("/:userId/account/:account-number",(req,res) => {

})

//////////////////////////
///// DELETE ROUTES /////
////////////////////////

app.delete("/account/:account-number", (req,res) => {
    
})


const server = app.listen(port, () => {
    console.log(`Server running at port:${port}...`)
})

module.exports = server;