const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggendin");
const productModel = require('../models/product-model');
const products = require("../models/product-model");
const usermodel = require('../models/usermodel');

router.get('/', (req, res) => {
    let error = req.flash("error") // or set error as required
    res.render('index', { error, loggedin:false });
});


router.get('/shop',isLoggedin, async (req, res) => {
    let products =  await productModel.find()
    let success = req.flash('success')
     res.render('shop',{products,success});
 });



 router.get('/logout',isLoggedin, (req, res) => {
    req.session.destroy();
    res.redirect('/');
    });

router.get('/addtocart/:productid' ,isLoggedin, async (req, res) =>{
  let user = await usermodel.findOne({email: req.user.email})
  user.cart.push(req.params.productid)
  await user.save();
  req.flash("success","added t0 cart")
  res.redirect('/shop')
})


router.get('/cart',isLoggedin, async (req, res) => {
    let user = await usermodel.findOne({email: req.user.email}).populate("cart")
const bill = (Number(user.cart[0].price) + 20) - Number(user.cart[0].discount)
     res.render('cart',{user,bill});
 });


module.exports = router;