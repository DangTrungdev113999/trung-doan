const ProductModel = require('../models/Product')

let getAllProduct = async (req, res) => {
    try {
        let getProducts = await ProductModel.find({}).exec()
        if (getProducts.length) res.json({ status: true, result: getProducts })       
    }
    catch (error) {
        console.log(error)
        res.json( {status: false, result: error })
    }
}

let getProductId = async(req, res) => {
    try {
        let id = req.params.uid;
        let getProductId = await ProductModel.findById(id).exec();
        if (!getProductId) res.json({ status: false, result: `Products not found!` })
        res.json({ status: true, result: getProductId })  
    }
    catch (error) {
        console.log(error)
        res.json( {status: false, result: error });
    }
}

let createProduct = async (req, res) => {
    try {
        let product = {
            name: req.body.name,
            price: req.body.price
        };
        let saveProduct = await ProductModel.create(product)
        res.json({ status: true, result: saveProduct })
    } catch (error) {
        console.log(error)
        res.json({ status: false, result: error })
    }
}

let updateProduct = async (req, res) => {
    try {
        let updateProduct = await ProductModel.update({ _id: req.params.uid }, { name: req.body.name, price: req.body.price}).exec()
        if (!updateProduct) res.json({ status: false, result: `User is not found!` })
        res.json(updateProduct)
    } catch (error) {
        console.log(error)
        res.json({ status: false, result: error })
    }
}

let deleteProduct = async (req, res) => {
    try {
        let deleteProduct = await ProductModel.findByIdAndDelete({ _id: req.params.uid}, {}).exec()
        if (!deleteProduct) res.json({ status: false, result: `User is not found!` });
        res.json({ status: true, result: deleteProduct })
    } catch (error) {
        console.log(error)
        res.json({ status: false, result: error })
    }
}

module.exports = { getAllProduct, getProductId, createProduct, updateProduct, deleteProduct }