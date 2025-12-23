import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import Footer from "../components/footer";
import { apiService, authUtils } from "../services/api";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState("cod");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Check if user is logged in
  useEffect(() => {
    if (!authUtils.isLoggedIn()) {
      toast.error("Please login to continue");
      navigate("/login");
      return;
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "pincode",
    ];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
        );
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const userData = authUtils.getUserData();
      const orderData = {
        items: location.state?.cartItems || [],
        totalAmount: location.state?.totalAmount || 0,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
        },
        paymentMethod: selectedPayment,
      };

      const data = await apiService.placeOrder(orderData, selectedPayment);

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error("Order placement error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <input
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleInputChange}
          />
          <div className="flex gap-4">
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-4">
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
            <input
              className="border border-gray-300 rounded py-2 px-3 w-full"
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </div>
          <input
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        {/* Right: Cart Total + Payment */}
        <div className="flex flex-col gap-8 w-full lg:w-1/3">
          <CartTotal />

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <Title title1="PAYMENT" title2="METHOD" />
            <div className="space-y-3">
              {/* Cash on Delivery Option */}
              <div
                className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition-all ${
                  selectedPayment === "cod"
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedPayment("cod")}
              >
                <span
                  className={`min-w-[16px] h-[16px] border-2 rounded-full inline-block ${
                    selectedPayment === "cod"
                      ? "border-green-500 bg-green-500"
                      : "border-gray-300 bg-white"
                  }`}
                />
                <span className="text-sm font-medium">Cash on Delivery</span>
              </div>

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
                <img
                  className="h-5 mx-2"
                  src={assets.stripe_logo}
                  alt="Stripe"
                />
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
                <img
                  className="h-5 mx-2"
                  src={assets.razorpay_logo}
                  alt="Razorpay"
                />
                <span className="text-sm font-medium">Razorpay</span>
              </div>
            </div>
          </div>

          <button
            className={`bg-black text-white py-3 px-6 mt-2 w-full lg:w-auto rounded-md transition-all ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-800"
            }`}
            onClick={handlePlaceOrder}
            disabled={isLoading}
          >
            {isLoading ? "PLACING ORDER..." : "PLACE ORDER"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
