import { Cart } from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { product, quantity, user } = req.body;

    // Create the cart item
    const cartItem = await Cart.create({ product, quantity, user });

    // Populate the product and user fields
    const populatedCartItem = await Cart.findById(cartItem._id).populate('product').populate('user');

    // Send the populated cart item as response
    res.status(201).json(populatedCartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
