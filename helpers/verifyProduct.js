
const ProductBrand = require("../models/productBrand");
const ProductCategory = require("../models/productCategory");
const Product = require("../models/product");

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

const verifyNameBrand = async(nombre)=>{
    const existeMarca = await ProductBrand.findOne({nombre});
    if(existeMarca){
        throw new Error(`Esta marca ya se encuentra registrada`);
    }
}
const verifyNameCategory = async(nombre)=>{
    const existeCategoria = await ProductCategory.findOne({nombre});
    if(existeCategoria){
        throw new Error(`Esta categoria ya se encuentra registrada`);
    }
}

const verifyProduct = async(id)=>{
    const productId = await Product.findById(id);
    if(!productId){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    verifyProductBrandId,
    verifyProductCategoryId,
    verifyProduct,
    verifyNameBrand,
    verifyNameCategory,
}