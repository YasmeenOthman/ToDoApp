const user = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ----------SignUp -----------------------------

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send({ msg: "All input is required" });
    }

    // check if user already exist in our database
    const oldUser = await user.findOne({ email });

    if (oldUser) {
      return res.status(409).send({ msg: "User Already Exist. Please Login" });
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      username,
      email,
      password: encryptedPassword,
    });
    res.status(200).json({ msg: "user registered successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Can not create a new user" });
  }
};

// ----------------Login--------------------
const loginUser = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send({
        msg: "Both email and password should exist ",
      });
    }
    // Validate if user exist in our database
    const userFound = await user.findOne({ email });

    if (userFound) {
      let isValidPassword = await bcrypt.compare(password, userFound.password);
      if (isValidPassword) {
        // Create token
        const token = jwt.sign(
          { userId: userFound._id, username: userFound.username },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );
        // save user token
        user.token = token;
        // user
        res.status(200).json({ msg: "Login successfully", token });
      } else {
        res.status(401).json({ msg: "Wrong Password" });
      }
    } else {
      res.status(400).send({ msg: "User not found,please register first" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, loginUser };
