import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Contact = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={assets.contact_img}
              alt="Contact Us"
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-gray-600">
                  123 Fashion Street, Style City, SC 12345
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@forever.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
