const categories = require('../../src/utils/categories.json')
const {Category} = require('../db')

exports.setCategories =  () => {
    try{
        categories.categories.forEach(async element => {
            await Category.findOrCreate({
                where: {
                    id: element.id,
                   name : element.name,
                }
            })
        });
    }catch(error){
        return error
    }
}