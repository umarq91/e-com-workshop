import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';

function Products() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const user = useSelector(state => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

console.log(products);

  const handleAddCart = (product) => {
    if (!user) {
      toast.error("Please Login First", {
        position: "bottom-left"
      });
      navigate('/sign-in');
      return;
    }
    let newObj = { product: product.id, quantity: 1 };
    // Assuming addToCartAsync is defined and imported correctly
    dispatch(addToCartAsync(newObj));
    toast.success("Item added to cart", {
      position: "bottom-left"
    });
  }
console.log(products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {loading && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {products?.map((product) => (
            <div key={product.id} className="group relative flex flex-col bg-gray-100 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
              <Link to={`/product/${product.id}`} className="no-underline">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.thumbnail || "https://cdn.shopify.com/s/files/1/1246/6441/articles/Shopify_Retail_BlogHeader_Product_Samples_FA.jpg?v=1727355120"}
                    alt={product.image}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between p-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Rating: {product.rating}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price}</p>
                </div>
              </Link>
              <Link
                to={`/product/${product.id}`}
                className="mt-auto bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 text-center rounded-b-lg transition-colors no-underline"
              >
                View More Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
