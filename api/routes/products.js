const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middlewares/checkauth');
const products = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString()+ '-' + file.originalname)
  }
});

const fileFilter = (req,file,cb) =>{
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
    cb(null, true);
  }else{
    cb(null, false);
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});



router.get('/', products.get_all_products);

router.post('/', checkAuth, upload.single('productImage'), products.post_product);

router.get('/:productId', products.get_single_product);

router.patch('/:productId', checkAuth, upload.single('productImage'), products.update_product);

router.delete('/:productId', checkAuth, products.delete_product);

module.exports = router;