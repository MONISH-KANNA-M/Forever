import React from 'react';

const Newsletterbox = () => {
  return (
    <div className="text-center py-10 px-4 ">
      <h1 className="text-3xl font-semibold text-black mb-4">Subscribe now and get <span className="text-red-500">20% Off</span></h1>
      
      <p className="text-gray-500 mt-2">
        Stay updated with our latest collections, offers, and more.
      </p>

      <form action="" className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="text"
          className="w-full sm:flex-1 px-4 py-3 border border-gray-300 rounded outline-none"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-800 transition"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Newsletterbox;
