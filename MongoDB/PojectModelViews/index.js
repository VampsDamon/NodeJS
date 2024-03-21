const express = require("express");
const { connectMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();

// -Connecting to MongoDB

connectMongoDB("mongodb://127.0.0.1:27017/youTube-app-1")
  .then(() => {
    console.log("Mongo DB connected");
  })
  .catch((err) => console.log("Error to connect to MongoDB", err));

// -Middelwares

app.use(logReqRes("log.txt"));
app.use(express.urlencoded({ extended: false }));

// -Routes 

app.use("/user", userRouter);


// -AppSetup

const port = 8001;




app.listen(port, () => {
  console.log("Server Startd on port :", port);
});
