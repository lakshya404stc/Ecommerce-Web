const categorymodel = require("../models/categorymodel")
const slugify = require("slugify")

const categorycontroler = {
    createcategorycontroler:async(req,res)=>{
        try {
            const {name} = req.body
            if(!name){
                return res.status(500).send({success:"false",messege:"required field is missing"})
            }
            const category = await categorymodel.findOne({name})
            if(category){
                return res.status(500).send({success:"false",messege:"this product already exist"})
            }
            const newcategory = await new categorymodel({name,slug:slugify(name)}).save()
            res.status(201).send({success:"true",messege:"created successfully",newcategory})
        } catch (error) {
            console.log(error)
            res.status(400).messege("error creating the category")
        }
    },
    updatecategorycontroler:async(req,res)=>{
        try {
            const {name} = req.body
            const {id} = req.params
            const category = await categorymodel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
            res.status(200).send({success:"true",messege:"successfully updated the category",category})
        } catch (error) {
            console.log(error)
            res.status(400).send({success:"false",messege:"error updating the category"})
        }
    },
    getcategorycontroler:async(req,res)=>{
        try {
            const categories = await categorymodel.find({})
            if(!categories){
                return res.status(200).send({success:"false"})
            }
            res.status(200).send({success:"true",categories})
        } catch (error) {
            console.log(error)
            res.status(400).send({success:"false",messege:"error getting the category"})
        }
    },
    getsinglecategorycontroler:async(req,res)=>{
        try {
            const {slug} = req.params
            const category = categorymodel.findOne({slug:slug})
            res.status(200).send({success:"true",category})
        } catch (error) {
            console.log(error)
            res.status(400).send({status:"false",messege:"error getting the category"})
        }
    },
    deletecategorycontroler:async(req,res)=>{
        try {
            const{id} = req.params
            const category = await categorymodel.findByIdAndDelete(id)
            if(category){
                return res.status(200).send({success:"true",messege:"category deleted successfully"})
            }
            else{
                return res.status(400).send({success:"false",messege:"error deleting the category"})
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({status:"false",messege:"error deleting the category"})
        }
    }
}

module.exports = categorycontroler