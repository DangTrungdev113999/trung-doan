const ProductModel = require("../models/Product");

let getAllProduct = async (req, res) => {
   try {
      let products = await ProductModel.find({}).exec();
      if (products.length) {
         return res.render('products/listProduct', { products });
      }
      return res.render('products/listProduct' );
   } catch (error) {
      console.log(error);
   }
};

let getProductId = async (req, res) => {
   try {
      let id = req.params.uid;
      let product = await ProductModel.findById(id).exec();
      if (product.name){
         res.render('products/viewProduct', { product })
      }
   } catch (error) {
      console.log(error);
      res.json({ status: false, result: error });
   }
};

let createProduct = async (req, res) => {
   try {
      let product = {
         name: req.body.name,
         price: req.body.price
      };
      await ProductModel.create(product);
      res.redirect('/product')
   } catch (error) {
      console.log(error);
   }
};

let getUpdateProduct = async (req, res) => {
   let pid = req.params.pid;
   let product =  await ProductModel.findById(pid).exec();

   res.render("products/edit" , {product})
}

let updateProduct = async (req, res) => {
   try {
      let product = {
         name: req.body.name, 
         price: req.body.price
      }
      let result = await ProductModel.update({ _id: req.params.pid}, { name: req.body.name,  price: req.body.price}).exec();
      if (result.n === 1) {
      return res.status(200).json({
            status: true,
            data : updateProduct
         })
      }
      return  res.status(500).json({
         status: false,
         message : "khong update dc"
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         status: false,
         error
      })
   }
};

let deleteProduct = async (req, res) => {
   try {
      let pid =  req.params.uid.trim() ;
      let deleteProduct = await ProductModel.findOneAndDelete({_id: pid}).exec();
      res.status(200).json({ status: true, result: deleteProduct });
   } catch (error) {
      console.log(error);
      res.status(500).json({ status: false, result: error });
   }
};

module.exports = {
   getAllProduct,
   getProductId,
   createProduct,
   updateProduct,
   deleteProduct,
   getUpdateProduct
};