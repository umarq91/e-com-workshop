
import {ProductModel } from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
    try {

   
        const products = await ProductModel.create(req.body);
        res.status(200).json(products);
    }catch(err){
        console.log(err);
    }
}

export const getProducts = async (req, res) => {

    try {

        let query =  ProductModel.find({});

        if(req.query.category){
            query = query.find({category:req.query.category});
        }

        if(req.query.brand){
            query = query.find({brand:req.query.brand});
        }

        // TODO : Sorting and Pagination

        let docs = await query.exec()
        res.status(200).json(docs);
    }catch(err){
        console.log(err);
    }
}