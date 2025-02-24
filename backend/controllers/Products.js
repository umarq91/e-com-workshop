
import {ProductModel } from "../models/ProductModel.js";

export const addProduct = async (req, res) => {
    try {

        console.log(req.body);
        
        const products = await ProductModel.create(req.body);
        res.status(200).json(products);
    }catch(err){
        console.log(err);
    }
}


export const getProducts = async (req, res) => {
    try {
        let query = ProductModel.find({deleted:false});
        
        if (req.query.category) {
            // category = smartphones, laptops $in:[smartphones, laptops]
            query = query.find({ category: { $in: req.query.category.split(',') } });
        }

        if (req.query.brand) {
            query = query.find({ brand: req.query.brand });
        }

        // Sorting (if needed)
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt'); // Default sort by createdAt
        }

        // Pagination
        const limit = parseInt(req.query.limit) || 6;
        const page = parseInt(req.query.page) || 1;

        const docs = await query.skip((page - 1) * limit).limit(limit).exec();
        const totalDocs = await query.clone().countDocuments();

        res.status(200).json({
            products: docs,
            total: totalDocs
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server Error' });
    }
};


export const fetchSingleProduct = async (req, res) => {

    try {
        const product = await ProductModel.findById(req.params.id);
        res.status(200).json(product);
    }catch(err){
        console.log(err);
    }
}

export const searchProduct = async (req, res) => {
    
const {q} = req.query
// console.log(req.query);
    try {
        const data = await ProductModel.find({
            $or: [
                { name: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
                {category: { $regex: q, $options: "i" }},
                {brand: { $regex: q, $options: "i" }},
            ]
        })

        res.json(data)
    } catch (error) {
        console.log("Error");
    }
    
}

export const updateProduct = async (req, res) => {

    const {id} = req.params
    try {
       const data = await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
       res.status(200).json(data)
    }catch{
console.log("error");
    }
}
