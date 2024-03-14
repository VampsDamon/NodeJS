//+ Import File Handling Module
const fs = require("fs");


//! Write data to file 

/* 
+ Write file in synchornous Manner
-It is Synchornous Call
-Take 2 arguments("FilePath","String Data")
*/
fs.writeFileSync("./sid.txt", "Hello Shahid!");



/* 
+ Write file in synchornous Manner
-It is an Asynchornous Call
-Take 3 arguments("FilePath","String Data",callback function for Error)
*/
fs.writeFile("./sid2.txt", "Hello Shahid! from Assync",(err)=>{});


