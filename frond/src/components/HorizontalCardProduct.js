import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(16).fill(null);
  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();
  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    console.log(categoryProduct);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };
  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h1 className="text-2xl font-bold py-4">{heading}</h1>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0  text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading ? (
         loadingList.map((product, index) => {
          return (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px]  h-36 bg-white rounded-sm shadow flex"
            >
              <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse">
                
              </div>
              <div className="p-4 grid w-full gap-2">
                <h2 className="font-medium  text-base md:text-lg text-ellipsis line-clamp-1 text-black  bg-slate-200 animate-pulse p-1 rounded-full">
              {product?.productName}
                </h2>
                <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse  rounded-full">
                  
                </p>
                <div className="flex gap-3 w-full">
                  <p className="font-medium text-red-400 p-1 bg-slate-200 w-full animate-pulse  rounded-full">
                   
                  </p>
                  <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse  rounded-full">
                    
                  </p>
                </div>
                <button className="text-sm text-white px-3 rounded-full w-full bg-slate-200">
              
                </button>
              </div>
            </div>
          );
        })
        ) : (
          data.map((product, index) => {
            return (
              <div
                key={index}
                className="w-full min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px]  h-36 bg-white rounded-sm shadow flex"
              >
                <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                  <img
                    src={product?.productImage[0]}
                    alt=""
                    className="object-scale-down h-full hover:scale-110 transition-all"
                  />
                </div>
                <div className="p-4 grid">
                  <h2 className="font-medium  text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-2">
                    <p className="font-medium text-red-400">
                      {displayCurrency(product.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayCurrency(product.price)}{" "}
                    </p>
                  </div>
                  <button className="text-sm bg-red-500 hover:bg-red-700 text-white px-3 rounded-full py-0.5">
                    Ajouter au panier
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
