import { Cart } from "../models/CartModel.js";

export const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    // Create the cart item
    const cartItem = await Cart.create({ product, quantity, user: req.user.id });

    // Populate the product and user fields
    const populatedCartItem = await Cart.findById(cartItem._id).populate('product').populate('user');

    // Send the populated cart item as response
    res.status(201).json({
      id: populatedCartItem._id, // Cart ID
      product: populatedCartItem ,// Product details
      quantity: populatedCartItem.quantity
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const fetchCart = async (req, res) => {
  try {
    const {id} = req.user;

    // Find all cart items for the specified user
    const cartItems = await Cart.find({ user: id })
      .populate('product')

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Transform the data to include only cart ID, product, and product details
    const transformedCartItems = cartItems.map(item => {
      return {
        id: item._id, // Cart ID
        product: item.product ,// Product details
        quantity: item.quantity
      };
    });

    res.status(200).json(transformedCartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


export const updateCart = async (req, res) => {
  try {
const {id} = req.params;
const docs = await Cart.findByIdAndUpdate(id,req.body,{new:true})
const cart = await docs.populate('product')
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export const deleteFromCart = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
  const doc = await Cart.findByIdAndDelete(id);
  res.status(200).json({message:"deleted"});
} catch (err) {
  res.status(400).json(err);
}
};

export const emptyCart = async (req, res) => {
  try {
    console.log("hitt");
    const docs = await Cart.deleteMany({ user: req.user.id });
    res.status(200).json({message:"deleted"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}