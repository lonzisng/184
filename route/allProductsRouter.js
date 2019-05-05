const allProductsController=require("../controller/allProductsController");
const myEx = require("express");
const router = myEx.Router();

router.post("/complex.do",allProductsController.complex);
router.post("/new.do",allProductsController.new);
router.post("/price.do",allProductsController.price);
router.post("/volume.do",allProductsController.volume);
router.post("/splbGoods.do",allProductsController.splbGoods);


module.exports = router;