const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subCategoriesSchema = Schema({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    }
})

module.exports = mongoose.model('subCategory', subCategoriesSchema)