const jwt = require("jsonwebtoken");
const userModel = require("../models/usermodel")

module.exports = async function(req, res, next){
    try{
        if(!req.cookies.token){
             res.flash("Unauthorized You Need To Login")
             return res.redirect('/login');
            }
        }
        catch(err){
             res.status(401).json({message: "Unable to ftech ino "})
            }

        try{
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let user = await userModel.findOne({email: decoded.email}).select("-password")  // mtlb password nhi chahiye
            req.user = user;
            next();

        }
        catch(err){
             res.flash( "Invalid Token")
             res.redirect('/login')
            }   

}
