const { default: slugify } = require("slugify")
const productmodel = require("../models/productmodel")
const fs = require("fs")

const productcontroler = {
    createproduct:async(req,res)=>{
        try {
            const {name,description,price,quantity,category,shipping} = await req.fields
            const {photo} = await req.files

            if(!name||!description||!price||!quantity||!category||!shipping){
                return res.status(500).send({success:"false",messege:"one of the required field is missing"})
            }
            if(!photo ){
                return res.status(500).send({success:"false",messege:"photo is required and should be less than 10 mb"})
            }

            const product = new productmodel({...req.fields,slug:slugify(name)})
            if(photo){
                product.photo.data= fs.readFileSync(photo.path)
                product.photoContentType = photo.type
            }
            await product.save()
            res.status(200).send({success:"true",messege:"product created successfully"})

        } catch (error) {
            console.log(error)
            res.status(400).send({success:"false",messege:"something went wrong"})
        }
    },
    getproductscontroler:async(req,res)=>{
    try {
        const products = await productmodel.find({}).select("-photo").populate('category').limit(12).sort({createsAt:-1})
        res.status(200).send({success:"true",products,totalCount:products.length})
    } catch (error) {
        console.log(error)
        res.status(400).send({success:"false",messege:"error getting products"})
    }
    },
    getproductcontroler:async(req,res)=>{
        try {
            const {slug} = req.params
            if(slug){
                return res.status(500).send({success:"false",messege:"cannot get slug"})
            }
            const product = await productmodel.findOne({slug}).select("-photo").populate('category')
            res.status(200).send({success:"true",product})
        }
         catch (error) {
            console.log(error)
            res.status(400).send({success:"false",messege:"error getting the product"})
        }
    },
    getphotocontroler:async(req,res)=>{
        try {
            const {pid} = req.params
            const product = await productmodel.findByid(pid)
            
            if(product.photo.data){
                res.set('Content-type', product.photo.contentType)
                return res.status(200).send(product.photo.data)
            }
        } catch (error) {
            console.log(error)
            res.status(400).send({success:"false",messege:"error getting the photo"})
        }
    },
    deleteproductcontroler:async(req,res)=>{
    try {    
        const {pid} = req.params
        await productmodel.findByIdAndDelete(pid)
        res.status(200).send({success:"true",messege:"product deleted successfully"})

    } catch (error) {
        console.log(error)
        res.status(400).send({success:"false",messege:"error deleting the product"})
    }
    },
    updateproductcontroler:async(req,res)=>{
        try {
            const { name, description, price, category, quantity, shipping } =
              req.fields;
            const { photo } = req.files;
            if(!name||!description||!quantity||!price||!category||!shipping){
                return res.status(500).send({success:"false",messege:"one of the required fields is missing"})
            }
            if(!photo&&photo.size>10000){
                return res.status(500).send({success:"true",messege:"photo is required and should be less than 10 mb"})
            }
        
            const products = await productmodel.findByIdAndUpdate(
              req.params.pid,
              { ...req.fields, slug: slugify(name) },
              { new: true }
            );
            if (photo) {
              products.photo.data = fs.readFileSync(photo.path);
              products.photo.contentType = photo.type;
            }
            await products.save();
            res.status(201).send({
              success: true,
              message: "Product Updated Successfully",
              products,
            });
          } catch (error) {
            console.log(error);
            res.status(500).send({
              success: false,
              error,
              message: "Error in Updte product",
            });
          }
    }
}

module.exports = productcontroler