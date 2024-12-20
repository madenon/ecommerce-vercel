import { useContext } from "react";
import addToCart from "../helpers/addToCart";
import displayCurrency from "../helpers/displayCurrency";
import scrollTop from "../helpers/scrollTop";
import Context from "../context";
import { Link } from "react-router-dom";

const VerticlaCard = ({loading, data=[]}) => {
    const { fetchUserAddToCart } = useContext(Context);

    const loadingList = new Array(16).fill(null);


    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart();

    }
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,300px))] justify-center md:justify-between md:gap-2 overflow-x-scroll scrollbar-none transition-all">
    {loading
      ? loadingList.map((product, index) => {
          return (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow"
            >
              <div className="bg-slate-200  h-48 p-4   minw-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2  animate-pulse rounded-full bg-slate-200"></h2>
                <p className="capitalize text-slate-500 p-1  animate-pulse rounded-full bg-slate-200 py-2"></p>
                <div className="flex gap-3">
                  <p className="text-red-600 font-medium p-1  animate-pulse rounded-full bg-slate-200 w-full py-2"></p>
                  <p className="text-slate-500 line-through p-1  animate-pulse rounded-full bg-slate-200 w-ful py-2l"></p>
                </div>
                <button className="text-sm text-white px-3  rounded-full bg-slate-200 py-2 animate-pulse"></button>
              </div>
            </div>
          );
        })
      : data.map((product, index) => {
          return (
            <Link
              to={"/product/"+ product._id}
              key={index}
              className="w-full min-w-[280px]  md:min-w-[300px] max-w-[280px]  md:max-w-[300px] bg-white rounded-sm shadow" onClick={scrollTop}
            >
              <div className="bg-slate-200  h-48 p-4   minw-[280px] md:min-w-[145px] flex justify-center items-center">
                <img
                  src={product?.productImage[0]}
                  className="object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply"
                />
              </div>
              <div className="p-4 grid gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.productName}
                </h2>
                <p className="">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-red-600">
                    {displayCurrency(product?.sellingPrice)}{" "}
                  </p>
                </div>
                <button
                  className="text-sm flex  w-40 ml-16 bg-purple-600 hover:bg-purple-700 text-white px-3 py-0.5 rounded-full"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Ajouter au panier
                </button>
              </div>
            </Link>
          );
        })}
  </div>
  )
}


export default VerticlaCard