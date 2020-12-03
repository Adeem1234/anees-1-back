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
        ref: 'subCategory'
    }]
})

module.exports = mongoose.model('category', CategorySchema);
