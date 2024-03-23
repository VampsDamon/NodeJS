const express = require("express");
const { MongoDBConnection } = require("./conection");
const {router}=require("./routes/url")
const app = express();
const port = 8001;
MongoDBConnection("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error to connect to MongoDB : \n", err));
  
  app.use(express.json());
  app.use("/url",router);
  




app.listen(port, () => console.log(`Server listening on port : ${port} `));
