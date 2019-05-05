const myExpress= require("express");
const articleRouter = myExpress.Router();
const articleController = require("../controller/articleController");

articleRouter.get("/tasteDetective.html",articleController.getUserList);
articleRouter.get("/articleDetail.do",articleController.getArticle);
module.exports = articleRouter;