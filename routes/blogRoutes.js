const express = require('express');
const router = express.Router();
const {createBlog,getaBlog} = require('../controller/blogController');
router.post('/create-blog',createBlog);
router.get('/get-a-blog/:id',getaBlog);



module.exports = router;