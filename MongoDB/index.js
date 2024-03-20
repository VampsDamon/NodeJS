const express = require("express");
const mongoose = require("mongoose");

// +=======================MongDB Setup============================+ //

// -Connecting to MongoDB

mongoose
  .connect("mongodb://127.0.0.1:27017/youTube-app-1")
  .then(() => {
    console.log("Connecting to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB ", err);
  });

// -Creating Schemas

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        // Check if email value is not null and not empty
        return value && value.trim().length > 0;
      },
      message: "Email cannot be empty",
    },
  },
  jobTitle: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

// -Creating Module
const User = mongoose.model("user", userSchema);

// +==============================================================+ //

const app = express();
const port = 8001;
app.use(express.urlencoded({ extended: false }));

// +===========================CRUD Operation====================+ //

// -Create Data into database
app.post("/create", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ message: "Invalid Fields" });
  }

  await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    gender: body.gender,
    jobTitle: body.job_title,
    email: body.email,
  });


  return res.status(201).json({ message: "Sucessfully Created" });
});

// -Read Data From database
app.get("/users", async (req, res) => {
  const allDBusers=await User.find({});
  const html=
  `
  <ul>
  ${allDBusers.map((user)=>`<li>${user.firstName}</li>`)}
  </ul>
  `
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDBusers=await User.find({});

  return res.status(200).json(allDBusers)
})


app
  .route("/api/users/:id")
  // -Read Data From database by ID
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  })

  // -Update Data From database
  .patch(async(req,res)=>{
     await User.findByIdAndUpdate(req.params.id,{firstName:"Md Shahil"})
     return res.status(201).json({msg: "Updated"});
  })
  // -Delete Data From database
  .delete(async(req, res) => {
      await User.findByIdAndDelete(req.params.id);
      return res.status(201).json({ msg: "Deleted" });
  });

// +==============================================================+ //

app.listen(port, () => {
  console.log("Server Startd on port :", port);
});
