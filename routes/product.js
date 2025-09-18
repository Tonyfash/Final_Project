const{createProduct, update,deleteProduct} = require('../controller/product')

const uploads = require('../middleware/multer')

const router = require('express').Router()

router.post = ('/createProduct', uploads.array('productImage', 5), createProduct)

router.put = ('/update/:id', uploads.array('productImage', 5), update)

router.delete = ('/delete/:id', uploads.array('productImage',2), deleteProduct)

module.exports = router