const ProductModel = require('../models/Product')

let getAllProduct = async (req, res) => {
    try {
        let getProducts = await ProductModel.find()
        if (!getProducts) res.json({ success: false, result: `Products not found!` })
        res.json({ success: true, result: data })       
    }
    catch (error) {
        console.log(error)
        res.json( {success: false, result: error })
    }
}

let getProductId = async(req, res) => {
    try {
        let getProductId = await ProductModel.findById()
        if (!getProductId) res.json({ success: false, result: `Products not found!` })
        res.json({ success: true, result: data })       
    }
    catch (error) {
        console.log(error)
        res.json( {success: false, result: error })
    }
}

let createProduct = async (req, res) => {
    try {
        let product = new ProductModel({
            name: req.body.name,
            price: req.body.price
        })
        let saveProduct = await product.save()
        res.json({ success: true, result: saveProduct })
    } catch (error) {
        console.log(error)
        res.json({ success: false, result: error })
    }
}

let updateProduct = async (req, res) => {
    try {
        let updateProduct = await ProductModel.update({ _id: req.body._id }, req.body)
        if (!updateProduct) res.json({ success: false, result: `User is not found!` })
        res.json(updateProduct)
    } catch (error) {
        console.log(error)
        res.json({ success: false, result: error })
    }
}

let deleteProduct = async (req, res) => {
    try {
        let deleteProduct = await ProductModel.findByIdAndDelete({ _id: req.body._id })
        if (!deleteProduct) res.json({ success: false, result: `User is not found!` })
        res.json({ success: true, result: deleteProduct })
    } catch (error) {
        console.log(error)
        res.json({ success: false, result: error })
    }
}

module.exports = { getAllProduct, getProductId, createProduct, updateProduct, deleteProduct }