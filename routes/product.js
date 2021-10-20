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

// @desc get all product details
// @route GET /product/list
router.get('/list',(req,res,next) => {
    Product.find({},(err,data)=>{
        if(!data){
            return res.json({success:false, msg:'not found'})
        } else {
            return res.status(200).json({success:true, items:data})
        }
    })
});

// @desc The api for update product
// @route PUT /api/product/edit/:id
router.put('/edit/:id',(req,res,next)=>{
    Product.findById(req.params.id,(err,found)=>{
        if(!found){
            return res.json({success: false, msg: 'not found'});
        }else{
            Product.findByIdAndUpdate(req.params.id,{$set: req.body},(error,content)=>{
                if(error){
                    return res.json({success: false, msg: 'not found'});
                }else{
                    return res.json({success:true,msg:'successfully edited'})
                }
            })
        }
    })
})


// @desc delete product
// @route DELETE /product/delete/:id
router.delete('/delete/:id',(req,res,next) => {
    Product.findOneAndRemove(req.params.id,(err,data)=>{
        if(!data){
            return res.json({success:false, msg:'not found'})
        } else {
            return res.status(200).json({success:true, msg:'product deleted'})
        }
    })
});

module.exports = router;