import mongoose, { Schema } from "mongoose";


const productSchema = new Schema({
    title: { type : String, required: true, unique: true},
    description: { type : String, required: true},
    price: { type: Number, min:[1, 'wrong min price']},
    discountPercentage: { type: Number,  max:[99, 'wrong max discount']},
    rating: { type: Number, min:[0, 'wrong min rating'], max:[5, 'wrong max price'], default:0},
    stock: { type: Number, min:[0, 'wrong min stock'], default:0},
    brand: { type : String},
    category: { type : String, required: true},
    thumbnail: { type : String, required: true},
    images:{ type : [String], required: true},
    // colors:{ type : [Schema.Types.Mixed] },
    // sizes:{ type : [Schema.Types.Mixed]},
    // highlights:{ type : [String] },
})

// _id to .id
const virtualId  = productSchema.virtual('id');
virtualId.get(function(){
    return this._id;
})

productSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function (doc,ret) { delete ret._id}
})


export const ProductModel = mongoose.model('Product',productSchema)