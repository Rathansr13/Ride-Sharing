const jwt = require("jsonwebtoken");
const axios = require("axios");

const userAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    const response = await axios.get(`${process.env.BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    req.user = response.data
    console.log(response.data);
    
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};


module.exports = userAuth