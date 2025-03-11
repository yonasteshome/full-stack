const jwt=require('jsonwebtoken')
const registerModel=require('../models/registerModel')
const protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)){

        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await registerModel.findById(decoded.id).select("-password");

            next(); // Proceed to the next middleware
        } catch (error) {
            console.error("Error in protect middleware:", error.message);
            res.status(401).json({message:"Not authorized"})
        }
    } else {
        res.status(401).json({message:"Not authorized, no token"})
        
    }

}
module.exports=protect
