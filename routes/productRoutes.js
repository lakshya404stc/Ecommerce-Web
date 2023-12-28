const express = require("express")
const routes = express.Router()
const productcontroler = require("../controlers/productcontroler")
const authMiddleware = require("../middlewares/authMiddlewares")
const formidable = require("express-formidable")

routes.post("/create-product",formidable() ,productcontroler.createproduct)

routes.get("/get-products",productcontroler.getproductscontroler)

routes.get("/product-photo/:pid",productcontroler.getphotocontroler)

routes.get("/get-product/:slug",productcontroler.getproductcontroler)

routes.delete("/delete-product/:pid",productcontroler.deleteproductcontroler)

routes.put(
    "/update-product/:pid",
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    formidable(),
    productcontroler.updateproductcontroler
  );

module.exports = routes