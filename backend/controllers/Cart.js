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

export const fetchCart = async (req, res) => {
  try {
    const userId = req.query.id;

    // Find all cart items for the specified user
    const cartItems = await Cart.find({ user: userId })
      .populate('product')

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Transform the data to include only cart ID, product, and product details
    const transformedCartItems = cartItems.map(item => {
      return {
        id: item._id, // Cart ID
        product: item.product // Product details
      };
    });

    res.status(200).json(transformedCartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

