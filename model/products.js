const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const productSchema = Schema({
    name: String,
    price: Number,
    description: String,
    details: [{
        subCategory: {
            type: Schema.Types.ObjectId,
            ref: 'subCategories'
        },
        detail: String
    }]

})

module.exports = mongoose.model('products', productSchema);