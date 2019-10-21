const ProductModel = require("../models/Product");

let getAllProduct = async (req, res) => {
   try {
      let page = +req.query.page  || 0;
      if (page <= 0) page = 0;
      let perPage = 2;
      let start = page * perPage ;
      let numberOfProduct = await ProductModel.count();
      let numberOfPages = Math.floor(numberOfProduct/2);
      if (page >= numberOfPages) {
         page = numberOfPages;
      };

      let name = req.session.user.username;

      let products = await ProductModel.find({}).skip(start).limit(perPage).exec();
      if (products.length) {
         return res.render('products/listProduct', { products, numberOfPages, page , name});
      }
      return res.render('products/listProduct', { numberOfPages, page , name});
   } catch (error) {
      console.log(error);
   }
};

let getCreateProduct = (req, res) => {
   let name = req.session.user.username;
   res.render('products/createProduct', { name });
}

let getProductId = async (req, res) => {
   try {
      let id = req.params.uid;
      let product = await ProductModel.findById(id).exec();
      if (product.name){
         let name = req.session.user.username;
         res.render('products/viewProduct', { product, name })
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
   let name = req.session.user.username;
   res.render("products/edit" , {product, name})
}

let updateProduct = async (req, res) => {
   try {
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
   getUpdateProduct,
   getCreateProduct,
};