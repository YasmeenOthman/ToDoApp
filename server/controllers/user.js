const userModel = require("../database/models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ----------SignUp -----------------------------

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await userModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: encryptedPassword,
    });
    res.status(200).json({ msg: "user registered successfully", newUser });
  } catch (error) {
    // if you try to login with the same username the error object will bee the following  "error": {
    //         "index": 0,
    //         "code": 11000,
    //         "keyPattern": {
    //             "username": 1
    //         },
    //         "keyValue": {
    //             "username": "yasmeen1"
    //         }
    //     }
    // }
    if (error.code === 11000) {
      res
        .status(409)
        .send(
          "The username or email address you entered is already registered. Please choose a different username or email address"
        );
    } else {
      console.log(error);
      res.status(500).json({ msg: "Can not create a new user" });
    }
  }
};

// ----------------Login--------------------
const loginUser = async (req, res) => {
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { username, user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      console.log("token", token);
      // save user token
      user.token = token;

      // user
      res.status(200).json({ msg: "Login successfully", user });
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { registerUser, loginUser };
