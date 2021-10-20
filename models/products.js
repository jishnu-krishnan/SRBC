const mongoose = require('mongoose');

// Product Schema
const ProductSchema = mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    price: {
        type: Number,
        required: true
    }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

// Function for new creating new product
module.exports.createNewProduct= function(newProduct, callback){    
    newProduct.save(callback)
}

// Function for check already added or not
module.exports.getProductByName = function(proname, callback){
    const query = {product: proname}
    Product.findOne(query, callback);
}