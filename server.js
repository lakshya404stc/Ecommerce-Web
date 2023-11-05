const express = require("express")
const app = express()
require("dotenv").config()
const morgan = require("morgan")
const authRoutes = require("./routes/authRoutes")
const cors = require("cors")
const categoryroutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")

//db connection
const connectionDB = require("./config/db")
connectionDB()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryroutes)
app.use("/api/v1/product",productRoutes)

//apis
app.get("/",(req,res)=>{
    res.send("<h1>this is the home page</h1>")
})


// server listen 
app.listen(process.env.PORT,()=>{
    console.log(`listening at port :${process.env.PORT}`)
})

