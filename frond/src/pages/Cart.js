import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../commun";
import Context from "../context";
import displayCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";

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
  }, []);

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateToCartProduct.url, {
      method: SummaryApi.updateToCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: id, quantity: qty + 1 }),
    });

    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
    }
  };
  //   const decr

  const decreaseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateToCartProduct.url, {
        method: SummaryApi.updateToCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ _id: id, quantity: qty - 1 }),
      });

      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deletCartProduct = async(id)=>{
    // deleteCartProduct
    
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
          method: SummaryApi.deleteCartProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ _id: id}),
        });
  
        const responseData = await response.json();
        if (responseData.success) {
          fetchData();
        }
      
  }

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
      <div className="flex  flex-col lg:flex-row gap-10 lg:justify-between p-4">
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
                h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        alt=""
                        className="w-full  h-full 
                      object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* delete product */}
                      <div className="absolute right-0 text-red-600 rounded-full p-2 cursor-pointer hover:bg-red-600 hover:text-white"
                      onClick={()=>deletCartProduct(product?._id)}>
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-2xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId?.category}
                      </p>
                      <p className="text-red-600 font-medium text-lg">
                        {displayCurrency(product?.productId?.sellingPrice)}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          className="border  border-purple-600 hover:bg-purple-600 hover:text-white text-purple-600 w-6 h-6 justify-between items-center rounded"
                          onClick={() =>
                            decreaseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span className="">{product?.quantity}</span>
                        <button
                          className="border  border-purple-600 hover:bg-purple-600 hover:text-white text-purple-600 w-6 max-h-6  justify-between items-center rounded"
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
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
