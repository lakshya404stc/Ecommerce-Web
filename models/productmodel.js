const mongoose = require("mongoose")
const categorymodel = require("../models/categorymodel")

const productmodel = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"categories",
        required:true
    },shipping:{
        type:Boolean
    },
    slug:{
        type:String,
        required:true
    }
},{timestamps:true}) 

module.exports = mongoose.model('products',productmodel)