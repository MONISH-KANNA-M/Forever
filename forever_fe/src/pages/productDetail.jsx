import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { shopContext } from "../context/shopContext";
import { assets } from "../assets/frontend_assets/assets";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, currency, add } = useContext(shopContext);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = products.find((p) => p._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // If product not found, redirect to collection page
      navigate("/collection");
    }
  }, [id, products, navigate]);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Add to cart using the context function
    add(product._id, selectedSize);
    toast.success(
      `Added ${quantity} ${product.name} (${selectedSize}) to cart!`,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-black flex items-center gap-2"
          >
            <span>←</span> Back to Collection
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.image[selectedImage]}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>

            {/* Image Gallery */}
            {product.image.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {product.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 ${
                      selectedImage === index
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-red-500 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">(122)</span>
              </div>

              <p className="text-3xl font-bold text-gray-800">
                {currency} {product.price}
              </p>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-6 py-3 border-2 rounded-md text-lg font-medium transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition-colors text-lg font-semibold"
            >
              ADD TO CART
            </button>

            {/* Product Information */}
            <div className="space-y-4 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                100% Original product.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Cash on delivery is available on this product.
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Easy return and exchange policy within 7 days.
              </p>
            </div>
          </div>
        </div>

        {/* Description and Reviews Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <div className="flex gap-8">
              <button className="py-4 px-2 border-b-2 border-black font-semibold">
                Description
              </button>
              <button className="py-4 px-2 text-gray-500 hover:text-black">
                Reviews (122)
              </button>
            </div>
          </div>

          <div className="py-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                An e-commerce website is an online platform that allows
                businesses to sell products or services to customers over the
                internet. These websites provide a convenient way for customers
                to browse, select, and purchase items from the comfort of their
                homes.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The benefits of e-commerce include convenience, accessibility,
                and global reach. Products are typically displayed with detailed
                descriptions, images, prices, and variations on dedicated
                product pages.
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold inline-flex items-center">
              <span className="w-8 h-px bg-gray-300 mr-4"></span>
              RELATED PRODUCTS
              <span className="w-8 h-px bg-gray-300 ml-4"></span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products
              .filter(
                (p) => p.category === product.category && p._id !== product._id
              )
              .slice(0, 5)
              .map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  className="cursor-pointer group"
                  onClick={() => navigate(`/products/${relatedProduct._id}`)}
                >
                  <div className="overflow-hidden rounded-lg mb-3">
                    <img
                      src={relatedProduct.image[0]}
                      alt={relatedProduct.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="text-sm font-medium mb-1">
                    {relatedProduct.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {currency} {relatedProduct.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
