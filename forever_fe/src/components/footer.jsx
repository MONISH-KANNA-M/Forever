import React from 'react';
import { assets } from '../assets/frontend_assets/assets';

const Footer = () => {
  return (
    <div className="  px-6 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        
        <div>
          <img src={assets.logo} alt="Logo" className="w-36 mb-4" />
          <p className="text-gray-400 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, pariatur.
          </p>
        </div>

        <div>
          <h1 className="text-lg font-semibold mb-4">Company</h1>
          <ul className="text-gray-400 text-sm space-y-2">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Delivery</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h1 className="text-lg font-semibold mb-4">Get in Touch</h1>
          <p className="text-gray-400 text-sm">+91 464646463</p>
          <p className="text-gray-400 text-sm">greatstackdev@gmail.com</p>
          <p className="text-gray-400 text-sm">Instagram</p>
        </div>

      </div>

      <div className="text-center text-gray-500 text-xs mt-12">
        © 2025 YourBrand. All rights reserved.
      </div>
    </div>
  );
};

export default Footer;
