// -Creating Schemas
const mongoose=require('mongoose');
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

module.exports = User;


