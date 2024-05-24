import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCart, removeFromCartAsync, updateCart, updateCartAsync } from '../features/cart/cartSlice';

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // const totalAmount = cart?.reduce(
  //   (acc, item) => acc + item.product.price * item.quantity,
  //   0
  // );
  // const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0);
// TODO :fix

const totalAmount = 10
const totalItems=20


  const handleRemove = (id) => {
    console.log(id,"id");
    dispatch(removeFromCartAsync(id));
  };

  const handleQuantity = (e, item) => {
    const updatedItem = { id:item.id, quantity: +e.target.value };
    // console.log(updatedItem,"updatedItem");
    dispatch(updateCartAsync(updatedItem));
  };

  


  return (
    <div className="mx-auto max-w-7xl mt-12 bg-white px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Cart</h1>
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart?.map((item) => (
              <li key={item.product._id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <Link to={`/product/${item.product._id}`}>{item.product.title}</Link>
                      </h3>
                      <p className="ml-4">{item.product.price} PKR</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-gray-500">
                      <label
                        htmlFor="quantity"
                        className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                      >
                        QTY
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
                        className="font-medium text-indigo-600 hover:text-indigo-500"
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
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>{totalAmount} PKR</p>
        </div>
        <div className="flex justify-between py-2 text-base font-medium text-gray-900">
          <p>Total Items</p>
          <p>{totalItems} Items</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
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
                className="font-medium m-2 text-indigo-600 hover:text-indigo-500"
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
