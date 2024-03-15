const express =require(`express`);

const users=require("./MOCK_DATA.json");

const fs=require("fs")


const app=express();

//+ SSR (Server side Rendering)
app.get("/users",(req,res)=>{
    const html=`
     <ul>
      ${users.map(user=>`<li>
      <ul>
      <li>${user.id}</li>
       <li>${user.first_name}</li>
       <li>${user.last_name}</li>
       <li>${user.job_title}</li>
       <li>${user.gender}</li>
      </ul></li>`).join("")}
     </ul>
    `;
    res.send(html);
})

//! REST APIs
//+ SSR (Client side Rendering)
// - List all users
app.get("/api/users",(req,res)=>res.json(users))

app.use(express.urlencoded({extended:false}));
// - Get the user with specific ID 
app.route("/api/users/:id")
.get((req,res)=>{
    const id=Number(req.params.id)

    const user=users.find((user)=>user.id===id)
    if(user)
    res.json(user)
   else
   res.json({id,error: "User not found"})
})
.post((req,res)=>{

  //+ TODO: Add new user
  const body = req.body;
  
  users.push({id:users.length ,...body});

  fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
      return res.json({status:"success",id:users.length-1});
  });

})
.patch((req,res)=>{
    //+ TODO: Edit the user with ID
    const id=Number(req.params.id);
    const body = req.body;
    const updatedUser=users.map((user)=>{
        return user.id===id ?{id:id,...body}:user
    })
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(updatedUser),(err,data)=>{
        return res.json({status:"Sucess ",id})
    })
    
})
.delete((req,res)=>{
    //+ TODO: Delete the user with ID
    const id=Number(req.params.id);

    const updatedUser=users.filter((user)=>user.id!==id)

    fs.writeFile("./MOCK_DATA.json",JSON.stringify(updatedUser),(err,data)=>{
        if(err)  return res.json({ status: `Failed to delete the User`, id });
        return res.json({status:`User deleted`,id})
    })

})




app.listen(8000,()=>console.log('Server Started'));