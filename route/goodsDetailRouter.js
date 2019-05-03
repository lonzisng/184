const goodsDetailController = require("../controller/goodsDetailController");
const myEx = require("express");
const router = myEx.Router();

router.get("/goodsDetail.do",goodsDetailController.goods);

module.exports = router;