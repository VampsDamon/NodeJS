//! Read data from file
const fs = require("fs");
/*
+ Read file in synchornous Manner
-It is Synchornous Call
-Take 2 arguments("FilePath","file-path")
*/
const data = fs.readFileSync("./sid.txt", "utf-8");
console.log(data);

/*
+ Read file in synchornous Manner
  -It is an Asynchornous Call
  -Take 3 arguments("FilePath","String Data",callback function for Error & Resutls)
*/
fs.readFile("./sid2.txt", "utf-8", (err, res) => {
  if (err) console.error(err);
  else console.log(res);
});

const os = require("os");
console.log(os.cpus().length);
