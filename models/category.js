const mongoose = require('mongoose');

// Uuers Schema
const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    }
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

// Function for new creating new category
module.exports.createNewCategory= function(newCategory, callback){    
    newCategory.save(callback)
}


// Function for check already added or not
module.exports.getCategoryByName = function(catname, callback){
    const query = {category: catname}
    Category.findOne(query, callback);
}