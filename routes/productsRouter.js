const express = require('express')
const router = express.Router()
const upload = require('../config/multer-config')
const productModle = require('../models/product-model')

router.post('/create', upload.single('image'), async function( req, res){
    try {
    let {name,price,discount, bgcolor, panelcolor, textcolor} = req.body

  let product = await productModle.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor
})
req.flash('success','product created')
res.redirect('/owners/admin')
} catch (error) {
    res.status(500).send(error)
    }
})

module.exports = router

