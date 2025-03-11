const register=require('../models/registerModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


// register user
const setData=async(req,res)=>{
    const {name,email,password}=req.body
    if(!name || !email || !password){
        return res.status(400).json({message:"please fill all forms"})
    }
    const testEmail=await register.findOne({email})
    if(testEmail){
        return res.status(400).json({message:'the email is already exist'})
    }

    // hash password
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password,salt)

    const response=await register.create({
        name,
        email,
        password:hashPassword
    })
    if(response){
        return res.status(200).json({
            _id:response._id,
            name:response.name,
            email:response.email,
            token:generateToken(response._id)
        })
    }
    
}

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        const findEmail = await register.findOne({ email });
        if (!findEmail) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const findPassword = await bcrypt.compare(password, findEmail.password);
        if (findPassword) {
            return res.status(200).json({
                _id: findEmail._id,
                name: findEmail.name,
                email: findEmail.email,
                token: generateToken(findEmail._id) // Send token here
            });
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// generate token
const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'2d'})
}

// usesr ui
const hidden=async(req,res)=>{
    res.status(200).json({message:"hidden file is accessed",
        
    })
}
module.exports = {
    setData,
    login,
    hidden
};
