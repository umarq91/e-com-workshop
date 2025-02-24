import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCartAsync, removeFromCartAsync, updateCartAsync } from '../features/cart/cartSlice';
import { useEffect } from 'react';

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const totalAmount = cart?.reduce(
    (acc, item) => acc + item?.product.price * item.quantity,
    0
  );
  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0);

  const handleRemove = (id) => {
    dispatch(removeFromCartAsync(id));
  };

  const handleQuantity = (e, item) => {
    const updatedItem = { id: item.id, quantity: +e.target.value };
    dispatch(updateCartAsync(updatedItem));
  };

  return (
    <div className="mx-auto max-w-7xl bg-white p-6 sm:px-6 lg:px-8 shadow-md rounded-lg">
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">Your Cart</h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart?.map((item) => (
              <li key={item.product._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product?.images[0] || "https://cdn.shopify.com/s/files/1/1246/6441/articles/Shopify_Retail_BlogHeader_Product_Samples_FA.jpg?v=1727355120"}
                    alt={item.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/product/${item.product._id}`} className="hover:underline">{item.product.title}</Link>
                      </h3>
                      <p className="ml-4 text-blue-600">{item.product.price} PKR</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm mt-4">
                    <div className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                      >
                        Quantity
                      </label>
                      <select
                        value={item.quantity}
                        onChange={(e) => handleQuantity(e, item)}
                        className="rounded-md border border-gray-300"
                      >
                        {[...Array(10).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex">
                      <button
                        onClick={() => handleRemove(item.id)}
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
          <p>Subtotal</p>
          <p className="text-blue-600">{totalAmount} PKR</p>
        </div>
        <div className="flex justify-between py-2 text-base font-medium text-gray-900 mb-4">
          <p>Total Items</p>
          <p className="text-blue-600">{totalItems} Items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500 mb-6">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <Link to="/">
              <button
                type="button"
                className="font-medium m-2 text-blue-600 hover:text-blue-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
