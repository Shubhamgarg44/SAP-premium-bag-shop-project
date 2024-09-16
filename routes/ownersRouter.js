const express = require('express');
const router = express.Router();
const ownerModel = require('../models/owner-model');


if (process.env.NODE_ENV === "development") {
    router.post('/create', async function (req, res) {
        try {
            let owners = await ownerModel.find();
            if (owners.length > 0) {
                return res.status(503).send('you dont have permission to create');
            }
            let { fullname, email, password } = req.body;
            let createdowner = await ownerModel.create({
                fullname,
                email,
                password
            });
            return res.status(201).send(createdowner);
        } catch (err) {
            return res.status(500).send(err.message); // Handle errors properly
        }
    });
}

router.get('/admin', (req, res) =>{
   let success =  req.flash('success')
    res.render("createproducts",{success})
})

console.log(process.env.NODE_ENV);

module.exports = router;
