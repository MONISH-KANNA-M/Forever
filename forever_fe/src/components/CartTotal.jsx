import React, { useContext } from "react";
import { shopContext } from "../context/shopContext";

const CartTotal = () => {
  const { cartitem, currency, delivery_fee, products } =
    useContext(shopContext);

  // Calculate cart total
  const calculateTotal = () => {
    let total = 0;
    Object.keys(cartitem).forEach((itemId) => {
      const product = products.find((p) => p._id === itemId);
      if (product) {
        Object.keys(cartitem[itemId]).forEach((size) => {
          const quantity = cartitem[itemId][size];
          total += product.price * quantity;
        });
      }
    });
    return total;
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

  const subtotal = calculateTotal();
  const total = subtotal + delivery_fee;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({getTotalItems()} items)
          </span>
          <span className="font-semibold">
            {currency} {subtotal}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-semibold">
            {currency} {delivery_fee}
          </span>
        </div>

        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-lg font-bold">
              {currency} {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
