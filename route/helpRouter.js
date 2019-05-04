const express = require("express");
const helpRouter = express.Router();
const helpController = require("../controller/helpController");

helpRouter.get("/",helpController.helpControlle);





// aboutRoute.get("/getListImg",aboutController.ImgControlle);
module.exports = helpRouter;