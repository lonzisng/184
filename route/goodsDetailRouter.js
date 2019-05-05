const goodsDetailController = require("../controller/goodsDetailController");
const myEx = require("express");
const router = myEx.Router();

router.get("/goodsDetail.do",goodsDetailController.goods);
router.post("/addToCard.do",goodsDetailController.addToCard);

module.exports = router;