import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrders } from '../features/order/orderSlice';
import { Navigate } from 'react-router-dom';

export default function UserOrders() {
  const dispatch = useDispatch();
  let orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-poppins">
        {orders.map((order, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Order ID #{order.id}
              </h2>
              <p className="text-lg text-green-600 mb-2">
                Order Status: {order.status}
              </p>
              <p className="text-gray-600">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600">
                Shipping Address: {order.shippingAddress}
              </p>
            </div>
            <div className="px-6 py-4 bg-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Items in This Order
              </h3>
              <ul className="-my-4 divide-y divide-gray-200">
                {order.items?.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">
                          {product.product.title}
                        </h4>
                        <p className="text-sm text-gray-500">{product.product.brand}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          Price: {product.product.price} PKR
                        </p>
                      </div>
                      <div className="flex items-end justify-between text-sm text-gray-500">
                        <span>QTY: {product.quantity}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-4 bg-gray-100 border-t border-gray-200">
              <div className="flex justify-between text-lg font-medium text-gray-800 mb-2">
                <span>Subtotal</span>
                <span className="font-bold">{order.totalAmount} PKR</span>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-800">
                <span>Total Items</span>
                <span>{order.totalItems} Items</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
