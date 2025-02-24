import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  createProductAsync,
  fetchSingleProduct,
  updateProductAsync,
} from "../../products/productSlice";
import axios from "axios";

function ProductForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const brands = {
    id: "brand",
    name: "Brands",
    options: [
      { value: "Apple", label: "Apple", checked: false },
      { value: "Samsung", label: "Samsung", checked: false },
      { value: "Microsoft", label: "Microsoft", checked: false },
      { value: "Google", label: "Google", checked: false },
      { value: "LG", label: "LG", checked: false },
    ],
  };
  const categories = {
    id: "category",
    name: "Category",
    options: [
      { value: "smartphones", label: "smartphones", checked: false },
      { value: "laptops", label: "laptops", checked: false },
      { value: "fragrances", label: "fragrances", checked: false },
      { value: "groceries", label: "groceries", checked: false },
      { value: "home-decoration", label: "home-decoration", checked: false },
    ],
  };

  const dispatch = useDispatch();
  const params = useParams();
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  useEffect(() => {
    if (params.id) {
      dispatch(fetchSingleProduct(params.id));
    } else {
      //   dispatch(clearSelectedProduct());
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("description", selectedProduct.description);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("stock", selectedProduct.stock);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
    }
  }, [selectedProduct, params.id, setValue]);

  const handleUploadImages = (e) => {
    const files = e.target.files;
    setLoading(true);

    const imagesFiles = [];
    for (let image of files) {
      imagesFiles.push(URL.createObjectURL(image));
    }
    setImages(imagesFiles);
  };

  const handleDelete = () => {
    const product = { ...selectedProduct };
    product.deleted = true;
    console.log(product);
    dispatch(updateProductAsync(product));
  };
  const handleUpload = async (data) => {
    const { images } = data;

    const formData = new FormData();
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    try {
      // Send the FormData object using axios
      const imagesLinks = await axios.post(
        "http://localhost:5000/test",
        formData,
        {
          headers: { "Content-type": "multipart/form-data" },
        }
      );

      const product = { ...data, images: imagesLinks.data.url };

      product.rating = 0;

      product.price = +product.price;
      product.stock = +product.stock;
      product.discountPercentage = +product.discountPercentage;

      if (params.id) {
        product.id = params.id;
        product.rating = selectedProduct.rating || 0;
        dispatch(updateProductAsync(product));
        reset();
      } else {
        dispatch(createProductAsync(product));
        reset();
        //TODO:  on product successfully added clear fields and show a message
      }
      setLoading(false);
      console.log("Upload successful:", response.data);
    } catch (error) {
      setLoading(false);
      console.error("Upload failed:", error);
    }
  };

  return (
    <form
      noValidate
      // onSubmit={handleSubmit((data) => {
      //   console.log(data);
      //   const product = { ...data };
      //   product.images = [
      //     product.image1,
      //     product.image2,
      //     product.image3,
      //     product.thumbnail,
      //   ];
      //   product.rating = 0;
      //   delete product['image1'];
      //   delete product['image2'];
      //   delete product['image3'];
      //   product.price = +product.price;
      //   product.stock = +product.stock;
      //   product.discountPercentage = +product.discountPercentage;

      //   if (params.id) {
      //     product.id = params.id;
      //     product.rating = selectedProduct.rating || 0;
      //     dispatch(updateProductAsync(product));
      //     reset();
      //   } else {
      //     dispatch(createProductAsync(product));
      //     reset();
      //     //TODO:  on product successfully added clear fields and show a message
      //   }
      // })}
      onSubmit={handleSubmit((data) => handleUpload(data))}
    >
      <div className="space-y-12 bg-white p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("title", {
                      required: "name is required",
                    })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description", {
                    required: "description is required",
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about product.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="brand"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  {...register("brand", {
                    required: "brand is required",
                  })}
                >
                  <option value="">--choose brand--</option>
                  {brands.options.map((brand) => (
                    <option value={brand.value}>{brand.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register("category", {
                    required: "category is required",
                  })}
                >
                  <option value="">--choose category--</option>
                  {categories.options.map((category) => (
                    <option value={category.value}>{category.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    {...register("price", {
                      required: "price is required",
                      min: 1,
                    })}
                    id="price"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Discount Percentage
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    {...register("discountPercentage", {
                      required: "discountPercentage is required",
                      min: 0,
                      max: 100,
                    })}
                    id="discountPercentage"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="number"
                    {...register("stock", {
                      required: "stock is required",
                      min: 0,
                    })}
                    id="stock"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
                  <input
                    type="text"
                    {...register("thumbnail", {
                      required: "thumbnail is required",
                    })}
                    id="thumbnail"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <input
            {...register("images", {
              required: "images are required",
            })}
            multiple
            onChange={(e) => handleUploadImages(e)}
            type="file"
          />
        </div>
        <div>
          {images?.map((singleImage) => (
            <img src={singleImage} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>

        {selectedProduct && (
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
        )}

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? "Loading...." : "Save"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
