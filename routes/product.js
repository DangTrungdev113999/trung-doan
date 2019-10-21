
const ProductService = require('../services/product')
const router = require('express').Router();

const auth = require("./../middleware/auth");

router.get('/createProduct',auth.checklogin, (req, res) => {
    res.render('products/createProduct');
})
router.get('/editProduct/:pid',auth.checklogin, ProductService.getUpdateProduct);
router.get('/',auth.checklogin, ProductService.getAllProduct);
router.get('/:uid',auth.checklogin, ProductService.getProductId);
router.post('/', ProductService.createProduct);

router.put('/:pid',auth.checkToken,auth.checkOuthMannager, ProductService.updateProduct);
router.delete('/:uid',auth.checkToken,auth.checkOuthAdim, ProductService.deleteProduct);

module.exports = router
