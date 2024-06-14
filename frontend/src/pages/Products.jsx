import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchProducts } from '../features/products/productSlice';
import { useSelector, useDispatch } from 'react-redux';
import { addToCartAsync } from '../features/cart/cartSlice';
import { toast } from 'react-toastify';

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const user = useSelector(state => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddCart = (product) => {
    if (!user) {
      toast.error("Please Login First", {
        position: "bottom-left"
      });
      navigate('/sign-in');
      return;
    }
    let newObj = { product: product.id, quantity: 1 };
    dispatch(addToCartAsync(newObj));
    toast.success("Item added to cart", {
      position: "bottom-left"
    });
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {products?.map((product) => (
            <div key={product.id} className="group relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
              <Link to={`/product/${product.id}`}>
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail}
                    alt={product.image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Rating: {product.rating}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </Link>
              <button
                onClick={() => handleAddCart(product)}
                className="mt-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-b-lg transition-colors"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
