const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CategorySchema = Schema({
    title: {
        type: String,
        required: true
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'subCategories'
    }]
})

module.exports = mongoose.model('categories', CategorySchema);
