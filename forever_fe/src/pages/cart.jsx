import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { shopContext } from "../context/shopContext";
import Footer from "../components/footer";
import { assets } from "../assets/frontend_assets/assets";

const Cart = () => {
  const { cartitem, setCartitem, currency, delivery_fee, products } =
    useContext(shopContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  // Calculate cart products and total
  useEffect(() => {
    const cartItems = [];
    let total = 0;

    Object.keys(cartitem).forEach((itemId) => {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        Object.keys(cartitem[itemId]).forEach((size) => {
          const quantity = cartitem[itemId][size];
          const itemTotal = product.price * quantity;
          total += itemTotal;

          cartItems.push({
            id: itemId,
            product,
            size,
            quantity,
            itemTotal,
          });
        });
      }
    });

    setCartProducts(cartItems);
    setTotalAmount(total);
  }, [cartitem, products]);

  // Remove item from cart
  const removeFromCart = (itemId, size) => {
    const newCart = structuredClone(cartitem);
    if (newCart[itemId] && newCart[itemId][size]) {
      delete newCart[itemId][size];
      if (Object.keys(newCart[itemId]).length === 0) {
        delete newCart[itemId];
      }
    }
    setCartitem(newCart);

    // Find product name for toast
    const product = products.find((p) => p._id === itemId);
    const productName = product ? product.name : "Item";

    toast.info(`${productName} (${size}) removed from cart!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Update quantity
  const updateQuantity = (itemId, size, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, size);
      return;
    }

    const newCart = structuredClone(cartitem);
    if (newCart[itemId]) {
      newCart[itemId][size] = newQuantity;
    }
    setCartitem(newCart);

    // Find product name for toast
    const product = products.find((p) => p._id === itemId);
    const productName = product ? product.name : "Item";

    toast.success(`Quantity updated for ${productName} (${size})!`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Get total items count
  const getTotalItems = () => {
    let count = 0;
    Object.keys(cartitem).forEach((itemId) => {
      Object.keys(cartitem[itemId]).forEach((size) => {
        count += cartitem[itemId][size];
      });
    });
    return count;
  };

  // Handle checkout
  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        cartItems: cartProducts,
        totalAmount: totalAmount + delivery_fee
      }
    });
  };

  // Continue shopping
  const continueShopping = () => {
    navigate("/collection");
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <img
                src={assets.cart_icon}
                alt="Empty Cart"
                className="w-24 h-24 mx-auto mb-4 opacity-50"
              />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
            </div>
            <button
              onClick={continueShopping}
              className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Shopping Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6">
                  Cart Items ({getTotalItems()})
                </h2>

                <div className="space-y-6">
                  {cartProducts.map((item, index) => (
                    <div
                      key={`${item.id}-${item.size}-${index}`}
                      className="flex items-center gap-4 p-4 border-b border-gray-200"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={item.product.image[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/80x80?text=Image";
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Size: {item.size}
                        </p>
                        <p className="text-lg font-semibold text-gray-800">
                          {currency} {item.product.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          {currency} {item.itemTotal}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Subtotal ({getTotalItems()} items)
                    </span>
                    <span className="font-semibold">
                      {currency} {totalAmount}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-semibold">
                      {currency} {delivery_fee}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-lg font-bold">
                        {currency} {totalAmount + delivery_fee}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={continueShopping}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
