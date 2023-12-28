const express = require("express")
const authMiddlewares = require("../middlewares/authMiddlewares")
const categorycontroler = require("../controlers/categorycontroler")

const routes = express.Router()

routes.post("/create-category",authMiddlewares.verifyToken,authMiddlewares.isAdmin,categorycontroler.createcategorycontroler)

routes.put("/update-category/:id",categorycontroler.updatecategorycontroler)

routes.get("/getcategory",categorycontroler.getcategorycontroler)

routes.get("/getsinglecategory/:slug",categorycontroler.getsinglecategorycontroler)
routes.delete("/delete-category/:id",authMiddlewares.verifyToken,authMiddlewares.isAdmin,categorycontroler.deletecategorycontroler)

module.exports = routes