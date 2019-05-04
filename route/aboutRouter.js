const express = require("express");
const aboutRouter = express.Router();
const aboutController = require("../controller/aboutController");

aboutRouter.get("/",aboutController.aboutControlle);





// aboutRoute.get("/getListImg",aboutController.ImgControlle);
module.exports = aboutRouter;