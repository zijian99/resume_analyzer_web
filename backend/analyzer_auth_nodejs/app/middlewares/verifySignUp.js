// Imports
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;


// Check if there is an existing username/email inside the MongoDB
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check if username exists
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json({ message: "Failed! Username is already in use!" });
    }

    // Check if email exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).json({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// Check if the role exist in MongoDB
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
      }
    }
  }
  next();
};

// Pack functions 
const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted
};

// Exports
module.exports = verifySignUp;