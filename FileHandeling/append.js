const fs=require("fs");


// fs.appendFileSync("./sid.txt","Hello world\n");
// fs.appendFile("./sid2.txt","Hello world assync\n",(err)=>{});

// ! Copy File
// fs.cpSync("./sid.txt","./cope.txt")

//! Delete File
// fs.unlinkSync("./cope.txt");

//! States Of File

console.log(fs.statSync("./sid.txt"));




