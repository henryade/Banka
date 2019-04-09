import express from "express";

const router = express.Router();

router.use((req, res, next) => {
    console.log("/"+ req.method);
    next();
});


/////////////////////
// Create Account //
///////////////////

router.post("/:userId/accounts", (req,res) => {

})

/////////////////////
// Debit Account //
///////////////////

router.post("/:userId/transactions/:account-number/debit", (req,res) => {

})

/////////////////////
// Credit Account //
///////////////////

router.post("/:userId/transactions/:account-number/credit", (req,res) => {

})

//////////////////////////////////
// Activate/Deactivate Account //
////////////////////////////////

router.put("/:userId/account/:account-number",(req, res) => {

})

//////////////////////////
///// Delete Account ///
////////////////////////

router.delete("/account/:account-number", (req, res) => {   
})

module.exports = router;