const express= require('express');
const URL=require("../modules/url");
const router=express.Router();


router.get('/',async(req,res)=>{
      if(!res.user) return res.render("login")
    const allUrls=await URL.find({createdBy:req.user._id});
    return res.render("home", { urls:allUrls,  name: "Shahid" });
})

router.get("/signup",(req,res)=>{
      return res.render("signUp")
})
router.get("/login",(req,res)=>{
      return res.render("login")
})
module.exports=router;