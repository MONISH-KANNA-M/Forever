import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src={assets.about_img}
              alt="About Us"
              className="w-full rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Welcome to Forever, your premier destination for fashion and
              style. We believe that everyone deserves to look and feel their
              best, which is why we curate collections that blend contemporary
              trends with timeless elegance.
            </p>
            <p className="text-gray-600 mb-4">
              Our mission is to provide high-quality, affordable fashion that
              empowers individuals to express their unique style. From casual
              wear to formal attire, we offer a diverse range of clothing for
              men, women, and children.
            </p>
            <p className="text-gray-600">
              With years of experience in the fashion industry, our team is
              dedicated to bringing you the latest styles while maintaining the
              highest standards of quality and customer service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
