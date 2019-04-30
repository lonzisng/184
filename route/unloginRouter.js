const myEx = require("express");
const router = myEx.Router();
const unloginCon = require("../controller/unloginController");

router.post("/search.do",unloginCon.search);
router.get("/login.html",(req,res)=>{
    res.redirect("/page/login.html");
})
router.get("/register",(req,res)=>{
    res.redirect("/page/registe.html");
})

module.exports = router;