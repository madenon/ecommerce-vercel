import React, { useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../commun";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import  MyLogo  from "../assest/eocmmerce.png"

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const disptach = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handlerLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      disptach(setUserDetails(null));
    }
    if (data.error) {
      toast.error(data.message);
    }
  };
  return (
    <header className="h-16 shadow-md bg-white">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            {/* <Logo  /> */}
            <img src={MyLogo} alt=""  className="rounded-full w-10 h-10"/>
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
          <div className="relative flex justify-center">
            <div
              className="text-3xl cursor-pointer flex justify-center"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaUserCircle />
              )}
            </div>

            {menuDisplay && (
              <div className="absolute bg-white  bottom-0 h-fit top-11 p-2  shadow-lg rounded">
                <nav>
                  <Link
                    to={"admin-panel"}
                    className="whitespace-nowrap md:block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((preve) => !preve)}>
                    Admin Panel
                  </Link>
                </nav>
              </div>
            )}
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
            {user?._id ? (
              <button
                onClick={handlerLogout}
                className="px-3 py-1 rounded-full text-white bg-red-400 hover:bg-red-700"
              >
                Déconnexion
              </button>
            ) : (
              <Link
                to={"login"}
                type=""
                className="px-3 py-1 rounded-full text-white bg-red-400 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
