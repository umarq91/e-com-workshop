import { Order } from "../models/OrderModel.js";
import {ProductModel} from "../models/ProductModel.js"
import {UserModel} from "../models/UserModel.js"

export const getUserOrders = async (req, res) => {
    const {id}  = req.user

    console.log("coming");
    try {
       const orders =  await Order.find({user:id})
       res.json(orders)
    } catch (error) {
        console.log("error");
    }
}

export const createOrder = async (req, res) => {
    // console.log(req.body);
    const order = new Order(req.body);
    // here we have to update stocks;
    
    for(let item of order.items){
       let product =  await ProductModel.findOne({_id:item.product.id})
       product.$inc('stock',-1*item.quantity);
       // for optimum performance we should make inventory outside of product.
       await product.save()
    }

    try {
      const doc = await order.save();
      const user = await UserModel.findById(order.user)
       // we can use await for this also 
    //    sendMail({to:user.email,html:invoiceTemplate(order),subject:'Order Received' })
      res.status(201).json(doc);
    } catch (err) {
        console.log(err);
      res.status(400).json(err);
    }
  };