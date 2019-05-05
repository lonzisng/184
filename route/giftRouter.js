const express = require("express");
const giftRouter = express.Router();
const giftController = require("../controller/giftController");

giftRouter.get("/",giftController.gift);

module.exports = giftRouter;