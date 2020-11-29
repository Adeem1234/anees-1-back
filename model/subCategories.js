const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const subCategoriesSchema = Schema({
    name: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categories'
    }
})

module.exports = mongoose.model('subCategories', subCategoriesSchema)