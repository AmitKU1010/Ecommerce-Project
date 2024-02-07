const express = require('express');
const router = express.Router();
const {createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct} = require("../controller/productCtrl");
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleWare');
router.post('/',createProduct);
router.get('/get-a-product/:id',authMiddleware,isAdmin,getaProduct);
router.get('/get-all-product',authMiddleware,isAdmin,getAllProduct);
router.put('/update-product/:id',authMiddleware,isAdmin,updateProduct);
router.delete('/delete-product/:id',authMiddleware,isAdmin,deleteProduct);

module.exports = router;