const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.register = async (req, res) => {
    try {
        const {name, age, email,password } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10); // 10 is a standard salt round value

 
        const newUser = new User({ name, email, age, password: hashPassword });
        await newUser.save();

    
        const token = jwt.sign({ id: newUser._id }, process.env.JWT, { expiresIn: '1h' });

   
        res.status(201).json({
            message: "User successfully registered",
            token,
        });
    } catch (error) {
        console.error("Error during registration:", error); // Log the error for debugging
        res.status(500).json({
            message: "Error while registering",
        });
    }
};

module.exports.login = async(req,res)=>{
    const {email , password} = req.body
    const user = await User.findOne({email})

    if(!user){
        res.status(200).json({
            message  : "Invalid login credentials",
            status : 404
        })
    }

    if(user){
        const isMatch  = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(400).json({
                message : "Invalid password",
                status : 400
            })
        }
    }
    const token  = jwt.sign({id : user._id} , process.env.JWT , {expiresIn : '1hr'})

    res.status(200).json({
        message : "Login successfull",
        status : 200,
        token : token
    })
}

module.exports.profile = async(req,res)=>{
console.log("Api hit")
  res.send(req.user)
}

