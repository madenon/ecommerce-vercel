import React from "react";
import Logo from "./Logo";
import { GrFormSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
        <Link to={"/"}>
        <Logo w={90} h={50} />
        </Link>
        </div>
        <div className="hidden lg:flex  w-full justify-between max-w-sm border rounded-full items-center focus:shadow pl-2">
          <input
            type="text"
            className="w-full outline-none "
            placeholder="Rechercher un produit"
          />
          <div className="text-lg w-13 h-8 min-w-[80px]  bg-red-400 flex items-center justify-center rounded-r-full text-white">
            <GrFormSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            <FaUserCircle />
          </div>
          <div className="text-2xl relative">
            <span className="">
              {" "}
              <BsCart4 />
            </span>
            <div className="bg-red-400 h-5 rounded-full text-white w-5 p-1 items-center text-center justify-center absolute -top-2 -right-2">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div>

          <Link to={"login"}
            type=""
            className="px-3 py-1 rounded-full text-white bg-red-400 hover:bg-red-700"
          >
            Login
          </Link>
        </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
