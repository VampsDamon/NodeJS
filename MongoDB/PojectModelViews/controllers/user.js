const User = require("../models/user");

const handelCreateUser = async (req, res) => {
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
};

const handelReadDataFromUser = async (req, res) => {
  const allDBusers = await User.find({});
  const html = `
  <ul>
  ${allDBusers.map((user) => `<li>${user.firstName}</li>`)}
  </ul>
  `;
  return res.send(html);
};

const handelAPIdata = async (req, res) => {
  const allDBusers = await User.find({});
  return res.status(200).json(allDBusers);
};

const handelGetDataById = async (req, res) => {
  const user = await User.findById(req.params.id);
  return res.status(200).json(user);
};

const handelUpdateDataById = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { firstName: "Md Shahil" });
  return res.status(201).json({ msg: "Updated" });
};

const handelDeleteDataById = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.status(201).json({ msg: "Deleted" });
};
module.exports = {
  handelCreateUser,
  handelReadDataFromUser,
  handelAPIdata,
  handelGetDataById,
  handelUpdateDataById,
  handelDeleteDataById,
};
