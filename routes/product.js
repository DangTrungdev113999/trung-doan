const ProductService = require('../services/product')
const router = require('express').Router()

router.get('/products', ProductService.getAllProduct)
router.get('/product/:uid', ProductService.getProductId)
router.post('/product', ProductService.createProduct)
router.put('/product/:uid', ProductService.updateProduct)
router.delete('/product/:uid', ProductService.deleteProduct)

module.exports = router