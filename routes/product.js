const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Category = require('../models/category');

// @desc The api for adding new category
// @route POST /api/product/category/add
router.post('/category/add',(req,res,next)=>{
    const catName = req.body.category
    let newCatgory = new Category({
        category: req.body.category,
    });
    Category.getCategoryByName(catName,(err,found)=>{
        if(found){
            return res.json({success: false, msg: 'Already inserted'});
        }else{
            Category.createNewCategory(newCatgory,(err,categ)=>{
                if(err){
                    return res.json({success: false, msg: 'Something Wrong, Retry!!'});
                }else{
                    res.json({success: true, values:categ});
                }
            }) 
        }
    })
})


// @desc The api for adding new product
// @route POST /api/product/product/add
router.post('/add',(req,res,next)=>{
    const proName = req.body.product
    let newProduct = new Product({
        product: req.body.product,
        category: req.body.category,
        price:req.body.price
    });
    Product.getProductByName(proName,(err,found)=>{
        if(found){
            return res.json({success: false, msg: 'Already inserted'});
        }else{
            Product.createNewProduct(newProduct,(err,prod)=>{
                if(err){
                    return res.json({success: false, msg: err});
                }else{
                    res.json({success: true, values:prod});
                }
            }) 
        }
    })
})

module.exports = router;