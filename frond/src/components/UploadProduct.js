import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadeImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../commun";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose,fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadeImage(file);

    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  // upload products

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.uploadProdut.url, {
      method: SummaryApi.uploadProdut.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body:JSON.stringify(data)
    });

    const responseData = await response.json()
    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchData()
    }

    if(response.error){
      toast.error(responseData?.message)
    }
  };
  return (
    <div className="fixed  top-0 left-0 ring-0 blur-0 bg-opacity-35 w-full h-full flex justify-center items-center">
      <div className="bg-white p-2 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">upload product</h2>
          <div
            className="w-fit ml-auto text-2xl  hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Nom du produit</label>
          <input
            type="text"
            id="productName"
            placeholder="Le nom du produit ici"
            value={data.productName}
            name="productName"
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-100 outline-none border rounded"
          />

          <label htmlFor="brandName" className="mt-3">
            Marque{" "}
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="La marque du produit"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
            required
            className="p-2 bg-slate-100 outline-none border rounded"
          />

          <label htmlFor="category" className="mt-3">
            Catégorie
          </label>

          <select
            value={data.category}
            name="category"
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
            required
          >
            <option value={""}>Selectionez une catégorie</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Image
          </label>
          <label htmlFor="uploadImageInput">
            <div className="text-slate-500 justify-center items-center flex-col gap-2 cursor-pointer">
              <div className="p-2 bg-slate-100 border rounded h-32 w-ful flex justify-center items-center ">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Télécharger une image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadProduct}
                  
                />
              </div>
            </div>
          </label>

          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        required
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full cursor-pointer hidden group-hover:block"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-purple-700">Téléchagée une image</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Prix :
          </label>
          <input
            type="number"
            id="price"
            placeholder="Le prix"
            value={data.price}
            name="price"
            required
            onChange={handleOnChange}
            className="p-2 bg-slate-100 outline-none border rounded"
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Prix de vente:
          </label>

          <input
            type="number"
            id="sellingPrice"
            placeholder="Prix de vente"
            value={data.sellingPrice}
            required
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 outline-none border rounded"
          />

          <label htmlFor="description" className="mt-3">
            Description: description
          </label>

          <textarea
            className="h-28 outline-none  border bg-slate-100 resize-none p-1"
            placeholder="Donnez une description au produit"
            rows={3}
            onChange={handleOnChange}
            name="description"
            required
            value={data.description}

          ></textarea>

          <button className="px-3 py-1 bg-red-600 text-white mb-10  hover:bg-red-700">
            Téléchagé un produit
          </button>
        </form>
      </div>
      {/* display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          imgUrl={fullScreenImage}
          onClose={() => setOpenFullScreenImage(false)}
        />
      )}
    </div>
  );
};

export default UploadProduct;
