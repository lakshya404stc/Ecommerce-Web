const mongoose = require("mongoose")


const categorymodel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true
    }
})

module.exports = mongoose.model("categories",categorymodel)