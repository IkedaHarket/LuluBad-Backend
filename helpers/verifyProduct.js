
const ProductBrand = require("../models/productBrand");
const ProductCategory = require("../models/productCategory");

const verifyProductBrandId = async(id)=>{
    const productBrandId = await ProductBrand.findById(id);
    if(!productBrandId){
        throw new Error(`El id ${id} no existe`);
    }
}

const verifyProductCategoryId = async(id)=>{
    const productCategoryId = await ProductCategory.findById(id);
    if(!productCategoryId){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    verifyProductBrandId,
    verifyProductCategoryId,
}