const allProductsRouter=require("../controller/allProductsController");
const myEx = require("express");
const router = myEx.Router();

router.post("/complex.do",allProductsRouter.complex);
router.post("/new.do",allProductsRouter.new);
router.post("/price.do",allProductsRouter.price);
router.post("/volume.do",allProductsRouter.volume);

module.exports = router;