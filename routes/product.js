const ProductService = require('../services/product')
const router = require('express').Router()

router.get('/', ProductService.getAllProduct)
router.get('/:uid', ProductService.getProductId)
router.post('/', ProductService.createProduct)
router.put('/:uid', ProductService.updateProduct)
router.delete('/:uid', ProductService.deleteProduct)

module.exports = router