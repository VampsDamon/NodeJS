const Users = require("../modules/user");
const {v4:uuidv4}=require("uuid");
const { setUser } = require("../services/auth");



const handleUserSignup=async(req,res)=>{
     const {name,email,password}=req.body;
     
     await Users.create({
        name,
        email,
        password,
     })

    
    return res.redirect("/");
}
const handleUserLogin=async(req,res)=>{
     const {email,password}=req.body;
     
     const user=await Users.findOne({email,password})
     console.log(user)
    
     if(!user) return res.render("login",{
        error:"Invalid username and password",
     })

      const sessionId = uuidv4();
    
      setUser(sessionId,user);
      res.cookie("uid",sessionId)
    return res.redirect("/");
}


module.exports = {
  handleUserSignup,
  handleUserLogin,
};