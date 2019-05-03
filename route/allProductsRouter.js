const allProductsController=require("../controller/allProductsController");
const myEx = require("express");
const router = myEx.Router();

router.post("/complex.do",allProductsController.complex);
router.post("/new.do",allProductsController.new);
router.post("/price.do",allProductsController.price);
router.post("/volume.do",allProductsController.volume);

module.exports = router;