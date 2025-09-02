const userModel = require("../models/usermodel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generatetoken} = require("../utils/generatetoken")

module.exports.registeruser = async function(req, res, next) {
    try {
        const { email, password, fullname } = req.body;

       let user1 = await userModel.findOne({email: email})
       if(user1){
         res.status(400).json({message: "User already exists"})
        }


        // Generate salt and hash password asynchronously
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user with the hashed password
        const user = await userModel.create({
            email,
            password: hashedPassword,
            fullname
        });
         let token =   generatetoken(user)
       res.cookie("token",token)
       res.send("user created successfully")

        // Send the created user as the response
        res.redirect('/shop');
    } catch (err) {
        // Handle errors and send appropriate response
        next(err);
    }
}

module.exports.loginuser = async function (req, res) {
    let {email, password} = req.body;
    
    let user = await userModel.findOne({email:email});

    if(!user) return res.send("email or password is incorrect")

    bcrypt.compare(password, user.password,function(err, result){
        if(result){
          let token =   generatetoken(user)
          res.cookie("token",token)
        //   res.send("you can login")
          res.redirect('/shop')
        }
        else{
            res.send("email or password incorrect")
        }
    })

    // module.exports.logout = (req, res) => {
    //     // Destroy the session
    //     req.session.destroy(err => {
    //         if (err) {
    //             return res.status(500).send('Failed to log out.');
    //         }
    //         // Redirect to the login page or home page after logout
    //         res.redirect('/login'); // Redirect to login page or home page
    //     });
    // }
}

