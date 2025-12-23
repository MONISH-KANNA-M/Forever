import React, { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const shopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setsSearch] = useState("");
  const [showsearch, setShowsearch] = useState(false);
  const [cartitem, setCartitem] = useState([]);

  const add = async (itemid, size) => {
    let cartdata = structuredClone(cartitem);

    if (cartdata[itemid]) {
      if (cartdata[itemid][size]) {
        cartdata[itemid][size] += 1;
      } else {
        cartdata[itemid][size] = 1;
      }
    } else {
      cartdata[itemid] = {};
      cartdata[itemid][size] = 1;
    }
    setCartitem(cartdata);
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    showsearch,
    setShowsearch,
    setsSearch,
    cartitem,
    setCartitem,
    add,
  };

  return <shopContext.Provider value={value}>{children}</shopContext.Provider>;
};

export default ShopContextProvider;
