// Imports
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;



// Function for signing up with username, email and password
exports.signup = async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    // Create new user
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user to DB
    await user.save();

    // Assign roles if provided
    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });

      if (!roles.length) {
        return res.status(400).json({ message: "Invalid roles provided" });
      }

      user.roles = roles.map((role) => role._id);
    } else {
      // Assign default "user" role
      const role = await Role.findOne({ name: "ROLE_USER" });
      user.roles = [role._id];
    }

    // Save updated user with roles
    await user.save();

    res.status(201).json({ message: "User was registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Function for signing in with email and password
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
      .populate("roles", "-__v");

    if (!user) {
      return res.status(404).json({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: 86400 } // 24 hours
    );

    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.signin = async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username })
//       .populate("roles", "-__v");

//     if (!user) {
//       return res.status(404).json({ message: "User Not found." });
//     }

//     const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

//     if (!passwordIsValid) {
//       return res.status(401).json({
//         accessToken: null,
//         message: "Invalid Password!"
//       });
//     }

//     // const token = jwt.sign(
//     //   { id: user.id },
//     //   config.secret,
//     //   {
//     //     algorithm: 'HS256',
//     //     allowInsecureKeySizes: true,
//     //     expiresIn: 86400 // 24 hours
//     //   }
//     // );
//     const token = jwt.sign(
//         { id: user.id },
//         process.env.JWT_SECRET,
//         {
//           algorithm: 'HS256',
//           allowInsecureKeySizes: true,
//           expiresIn: 86400 // 24 hours
//         }
//       );

//     const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

//     res.status(200).json({
//       id: user._id,
//       username: user.username,
//       email: user.email,
//       roles: authorities,
//       accessToken: token
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };