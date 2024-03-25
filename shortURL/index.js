const express = require("express");
const path = require("path");
const { MongoDBConnection } = require("./conection");
const { router } = require("./routes/url");
const staticRoutes=require("./routes/staticRoute")
const userRoute=require("./routes/user");
const app = express();
const port = 8001;

const cookieParser=require("cookie-parser");
const URL = require("./modules/url");
const { restrictToUserLoginOnly } = require("./middlewares/auth");
MongoDBConnection("mongodb://127.0.0.1:27017/url-shortner")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error to connect to MongoDB : \n", err));

// -SetUp for View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use("/url", restrictToUserLoginOnly,router);
app.use("/user",userRoute);
app.use("/",staticRoutes);

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", { urls: allUrls,name:"Shahid" });
// });

app.listen(port, () => console.log(`Server listening on port : ${port} `));
