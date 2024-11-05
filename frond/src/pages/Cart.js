import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../commun";
import Context from "../context";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoadig] = useState(false);
  const context = useContext(Context);

  const loadingdCart = new Array(context.carProductCount).fill(null);

  const fetchData = async () => {
    setLoadig(true);
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    setLoadig(false);
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  useEffect(() => {
    fetchData();
    console.log(data, "dataCart");
  }, []);

  return (
    <div
      className="container mx-auto
     p-4 "
    >
      <div className="text-center text-lg my-3">
        {data?.length === 0 && !loading && (
          <p className="bg-white py-5">Pas de donnée</p>
        )}
      </div>
      <div className="flex  flex-col lg:flex-row gap-10 lg:justify-between">
        {/* ** View product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingdCart.map((el, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-slate-200
                h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-white
                h-32 my-2 border border-slate-300"
                  >
                    <div className="w-28 h-28">
                      <img src={product?.productId?.productImage[0]} alt=""  className="w-full  h-full 
                      object-scale-down mix-blend-multiply"/>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* Sumary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse">
              total
            </div>
          ) : (
            <div className="h-36 bg-slate-200">total</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
