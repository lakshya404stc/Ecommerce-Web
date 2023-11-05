const JWT = require("jsonwebtoken")
const userModel = require("../models/usermodel")

const authMiddlewares = {
    verifyToken: async(req,res,next)=>{
    try {
        const decode = await JWT.verify(req.headers.authorization,process.env.JWT_secret)
        req.user = decode
        if (req.user) {
            next()
        }
    } catch (error) {
        console.log(error)
    }},
    isAdmin: async(req,res,next)=>{
        try {
            const user = await userModel.findById(req.user._id)
            if (user.role !== 1){
                res.status(401).send("unAuthorized access")
            }
            else{
                next()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = authMiddlewares