const {getUser}=require("../services/auth")

const restrictToUserLoginOnly=async(req,res,next)=>{
    const userId=req.cookies?.uid;
    
    if(!userId) return res.redirect("/login");

    const user=getUser(userId);

    if(!userId) return res.redirect("/login");

    req.user=user;

    next();

}

// async function autthenticate(){
   
// const userId = req.cookies?.uid;
   

//    const user = getUser(userId);


//    req.user = user;

   
// }
module.exports = {
  restrictToUserLoginOnly,
};