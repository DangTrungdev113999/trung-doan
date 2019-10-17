const ProductService = require('../services/product')
const router = require('express').Router()

router.get('/createProduct', (req, res) => {
    res.render('products/createProduct');
})
router.get('/editProduct/:pid', ProductService.getUpdateProduct)
router.get('/', ProductService.getAllProduct)
router.get('/:uid', ProductService.getProductId)
router.post('/', ProductService.createProduct)
router.put('/:pid', ProductService.updateProduct)
router.delete('/:uid', ProductService.deleteProduct)

module.exports = router