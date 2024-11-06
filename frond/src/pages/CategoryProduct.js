import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticlaCard from "../components/VerticlaCard";
import SummaryApi from "../commun";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryLisArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryLisArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await response.json();

    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);
  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);
    //url weh yu change checbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnchangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value)
    if(value ==='asc'){
      setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
    }
    if(value ==='desc'){
      setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
    }
  };


  useEffect(()=>{

  },[sortBy])
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
                <input
                  type="radio"
                  name="sortBy"
                  value={"asc"}
                  checked={sortBy ==='asc'}

                  onChange={handleOnchangeSortBy}
                />
                <label>Prix ​​- du plus bas au plus élevé</label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBy"
                  value={'desc'}
                  checked={sortBy =='desc'}
                  onChange={handleOnchangeSortBy}
                />
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
              {productCategory?.map((catgeoryName, index) => {
                return (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name={"category"}
                      id={catgeoryName?.value}
                      onChange={handleSelectCategory}
                      checked={selectCategory[catgeoryName?.value]}
                      value={catgeoryName?.value}
                    />
                    <label htmlFor={catgeoryName?.value}>
                      {catgeoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/* right side */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">
            {" "}
            {data.length} elements corresponds aux résultat à recherches
          </p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]">
            {data.length !== 0 && (
              <VerticlaCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
