const http = require('http');
const url=require("url");

const fs=require('fs');

const myServer=http.createServer((req,res)=>{

    const myUrl=url.parse(req.url,true);
    if(req.url==="/favicon.ico") return res.end();
    
    console.log(myUrl)
    const log=`${Date.now()+" :-  New Req. Recivied "}${req.url}\n`
    fs.appendFile("./log.txt",log,(err)=>{
        switch(myUrl.pathname){
            case "/":
                res.end("Home Page")
                break;
            case "/about":
                res.end(`Hello ${myUrl.query.name}`)
                break;
            default:
                res.end("Hello From Server");
                break;
        }
    })

    
});

myServer.listen(8000,()=>console.log("Server Started"));


