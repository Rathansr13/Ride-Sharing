const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Captain = require("../models/Captain");
const {subscribeToQueue , publishToQueue} = require('../services/rabbit')

captainListeners = []

module.exports.register = async (req, res) => {
  try {
    const { name, age, email, password, isAvailable } = req.body;

    const existingUser = await Captain.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10); // 10 is a standard salt round value

    const newCaptain = new Captain({
      name,
      email,
      age,
      password: hashPassword,
      isAvailable,
    });
    await newCaptain.save();

    const token = jwt.sign({ id: newCaptain._id }, process.env.JWT, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "captain successfully registered",
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error); // Log the error for debugging
    res.status(500).json({
      message: "Error while registering",
    });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const captain = await Captain.findOne({ email });

  if (!captain) {
    res.status(200).json({
      message: "Invalid login credentials",
      status: 404,
    });
  }

  if (captain) {
    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
      res.status(400).json({
        message: "Invalid password",
        status: 400,
      });
    }
  }
  const token = jwt.sign({ id: captain._id }, process.env.JWT, {
    expiresIn: "1hr",
  });

  res.status(200).json({
    message: "Login successfull",
    status: 200,
    token: token,
    data: captain,
  });
};

module.exports.profile = async (req, res) => {
  res.json({
    message: "Welcome to home page",
    status: 200,
  });
};

module.exports.toggleAvailability = async (req, res) => {
  try {
    console.log("apit hit");
    const captain = await Captain.findById(req.body._id);
    captain.isAvailable = !captain.isAvailable;
    await captain.save();
    res.status(200).json({
      data: captain,
    });
  } catch {
    res.status(400).json({
      message: "Internal server error",
    });
  }
};


module.exports.listenForRides = (req, res) => {
  captainListeners.push(res);
  setTimeout(() => {
    const index = captainListeners.indexOf(res);
    if (index > -1) {
      captainListeners.splice(index, 1);
      res.status(204).end(); 
    }
  }, 30000); 
};

// Subscribe to new ride notifications
subscribeToQueue("new-Ride", (data) => {
  const ride = JSON.parse(data);
  console.log("New Ride Received:", ride);
  while (captainListeners.length > 0) {
    const listener = captainListeners.pop();
    listener.status(200).json({ ride });
  }
});

