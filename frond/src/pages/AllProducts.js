import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../commun";
import AdminProductCart from "../components/AdminProductCart";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAlProuct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();
    setAllProduct(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAlProuct();
  }, []);

  return (
    <div>
      <div className="bg-white p-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Tout les produits </h2>
        <button
          className="border py-2 px-4 border-red-600 text-red-600 hover:bg-red-500  hover:text-white transition-all rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Enregistré un produit
        </button>
      </div>

      {/* Tout les produits */}

      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCart data={product} key={index + "AllProduct"}  fetchData={fetchAlProuct} />
           
          );
        })}
      </div>

      {/* Upload products components */}

      {openUploadProduct && (
        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchData={fetchAlProuct} />
      )}
    </div>
  );
};

export default AllProducts;
