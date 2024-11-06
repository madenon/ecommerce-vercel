import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";

const CategoryProduct = () => {
  const params = useParams();
  const [data, setData] = useState([])
  const [loading, setLoading]  = useState(false)
  // console.log(params)
  return (
    <div className="container mx-auto p-4">
      {/* desktop version */}
      <div className="hidden lg:grid grid-cols-[200px,1fr]">
        {/* left side */}
        <div className="bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll">
         {/* Sort By */}
          <div className="">
            <h3
              className="text-base uppercase font-medium text-slate-500
   border-b border-slate-300  pb-2"
            >
              Trier par
            </h3>
            <form className="text-sm flex-col gap-2 py-2">
              <div className="flex items-center gap-2">
                <input type="radio" name="sortBy" className="" />
                <label>Prix ​​- du plus bas au plus élevé</label>
              </div>

              <div className="flex items-center gap-2">
                <input type="radio" name="sortBy" className="" />
                <label>Prix ​​- du plus élevé au plus bas </label>
              </div>
            </form>
          </div>



          {/* Filter By */}
          <div className="">
            <h3
              className="text-base uppercase font-medium text-slate-500
   border-b border-slate-300  pb-2"
            >
              Catégorie
            </h3>
            <form className="text-sm flex-col gap-2 py-2">
              {
                productCategory?.map((catgeoryName, index)=>{
                  return (
                    <div className="flex items-center gap-3">
                      <input type="checkbox" name={"category"} id={catgeoryName?.value} />
                      <label htmlFor={catgeoryName?.value}>{catgeoryName.label}</label>
                    </div>
                  )
                })
              }

          
            </form>
          </div>
        </div>

        {/* right side */}
        <div>display product</div>
      </div>
    </div>
  );
};

export default CategoryProduct;
