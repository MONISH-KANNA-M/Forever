import React, { useState } from "react";
import Title from "../components/title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import Footer from "../components/footer";

const PlaceOrder = () => {
  const [selectedPayment, setSelectedPayment] = useState("cod");

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between gap-6 px-6 py-8 min-h-[90vh]">
        {/* Left: Delivery Info Form */}
        <div className="flex flex-col gap-5 w-full lg:w-2/3">
          <Title title1="DELIVERY" title2="INFORMATION" />
          <div className="flex gap-4">
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="First name"
            />
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="email"
            placeholder="Email address"
          />
          <input
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="text"
            placeholder="Street"
          />
          <div className="flex gap-4">
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="City"
            />
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex gap-4">
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="Zipcode"
            />
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="text"
            placeholder="Phone"
          />
        </div>

        {/* Right: Cart Total + Payment */}
        <div className="flex flex-col gap-8 w-full lg:w-1/3">
          <CartTotal />

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Title title1="PAYMENT" title2="METHOD" />
            <div className="space-y-3">
              {/* Stripe Option */}
              <div
                className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition-all ${
                  selectedPayment === "stripe"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPayment("stripe")}
              >
                <span
                  className={`min-w-[16px] h-[16px] border-2 rounded-full inline-block ${
                    selectedPayment === "stripe"
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300 bg-white"
                  }`}
                />
                <img className="h-5 mx-2" src={assets.stripe_logo} alt="Stripe" />
                <span className="text-sm font-medium">Stripe</span>
              </div>

              {/* Razorpay Option */}
              <div
                className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition-all ${
                  selectedPayment === "razorpay"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPayment("razorpay")}
              >
                <span
                  className={`min-w-[16px] h-[16px] border-2 rounded-full inline-block ${
                    selectedPayment === "razorpay"
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300 bg-white"
                  }`}
                />
                <img className="h-5 mx-2" src={assets.razorpay_logo} alt="Razorpay" />
                <span className="text-sm font-medium">Razorpay</span>
              </div>

              {/* Cash on Delivery Option */}
              <div
                className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition-all ${
                  selectedPayment === "cod"
                    ? "border-green-500 bg-green-500 text-white"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPayment("cod")}
              >
                <span
                  className={`min-w-[16px] h-[16px] border-2 rounded-full inline-block ${
                    selectedPayment === "cod"
                      ? "border-white bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                />
                <span className="text-sm font-medium">Cash on Delivery</span>
              </div>
            </div>
          </div>

          <button className="bg-black text-white py-3 px-6 mt-2 w-full lg:w-auto">
            PLACE ORDER
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PlaceOrder;
