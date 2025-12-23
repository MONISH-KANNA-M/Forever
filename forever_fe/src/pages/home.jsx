import React from "react";
import Hero from "../components/hero";
import LatestCollection from "../components/LatestCollection";
import Bestseller from "../components/bestseller";
import Outpolicy from "../components/outpolicy";
import Newsletterbox from "../components/newsletterbox";
import Footer from "../components/footer";

const Home = () => {
  return (
    <>
      <Hero />
      <LatestCollection />
      <Bestseller />
      <Outpolicy />
      <Newsletterbox />
      <Footer />
    </>
  );
};

export default Home;
