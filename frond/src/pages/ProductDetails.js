import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../commun";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import displayCurrency from "../helpers/displayCurrency";
import VerticalCardProduct from "../components/VerticalCardProduct";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(5).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReaponse = await response.json();
    setData(dataReaponse.data);
    setActiveImage(dataReaponse?.data?.productImage[0]);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const hanldeMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className=" min-h-[200px] flex flex-col lg:flex-row gap-4">
        {/* Product image */}
        <div className="h-full flex flex-col lg:flex-row-reverse gap-4">
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              alt="activeImage"
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />
            {/* product Zoom */}
            {zoomImage && (
              <div className="hidden lg:block  overflow-hidden absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px]  mix-blend-multiply scale-150"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex  gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {productImageListLoading.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 animate-pulse bg-slate-200 rounded"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex  gap-2 lg:flex-col overflow-scroll scrollbar-none h-full">
                {data?.productImage?.map((imgURL, index) => {
                  return (
                    <div
                      key={index}
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                    >
                      <img
                        src={imgURL}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => hanldeMouseEnterProduct(imgURL)}
                        onClick={() => hanldeMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Product details */}
        {loading ? (
          <div className="grid gap-1 w-full">
            <p className="bg-slate-200  animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl lg:h-8  font-medium h-6 bg-slate-200 animate-pulse w-full"></h2>
            <p className="capitalize text-slate-400 lg:h-8  bg-slate-200 min-w-[100px] animate-pulse h-6 w-full"></p>
            <div className="text-red-600 bg-slate-200 lg:h-8  animate-pulse flex items-center gap-1 w-full"></div>

            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6  lg:h-8 animate-pulse w-full">
              <p className="text-red-600 bg-slate-200 w-full"></p>
              <p className="text-slate-400 line-through bg-slate-200 w-full"></p>
            </div>

            <div className="flex items-center gap-3 my-2 w-full">
              <button className="h-6 bg-slate-200 lg:h-8  rounded animate-pulse"></button>
              <button className="h-6 bg-slate-200 lg:h-8  rounded animate-pulse"></button>
            </div>
            <div className="w-full">
              <p className="text-slate-600 lg:h-8 font-medium my-1 h-6  bg-slate-200 rounded animate-pulse w-full"></p>
              <p className="bg-slate-200 lg:h-12 h-10 rounded animate-pulse w-full"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-3xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-300">{data?.category}</p>
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex items-center text-2xl gap-2 lg:text-3xl font-medium my-1">
              <p className="text-red-400  ">
                {displayCurrency(data.sellingPrice)}
              </p>
              <p className="line-through">{displayCurrency(data.price)}</p>
            </div>
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-400 rounded px-3 py-1 uppercase min-w-[120px] text-red-600 font-medium hover:bg-red-500  hover:text-white">
                Acheter
              </button>
              <button className="border-2 border-red-400 rounded px-3 py-1 min-w-[120px] uppercase font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white">
                Ajouter au panier
              </button>
            </div>
            <div>
              <p className="text-slate-600 font-medium my-1">Description:</p>
              <p className="">{data?.description}</p>
            </div>
          </div>
        )}
      </div>
       {
        data.category && (
          <CategoryWiseProductDisplay
        category={data?.category}
        heading={"Les Produits recommandés"}
      />
        )
       }
    </div>
  );
};

export default ProductDetails;