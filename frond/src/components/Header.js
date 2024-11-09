import React, { useContext, useState } from "react";
import { GrFormSearch } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../commun";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import MyLogo from "../assest/eocmmerce.png";
import ROLE from "../commun/role";
import Context from "../context";
import About from "../pages/About";
import Contact from "../pages/Contact";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const searchInput = useLocation()
  const urlSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = urlSearch.getAll("q")
  const [search, setSearch] =useState(searchQuery)

  const handlerLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      disptach(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white  w-full fixed z-50 top-0">
      <div className="h-full container mx-auto flex items-center  justify-between">
        <div className="">
          <Link to={"/"}>
            {/* <Logo  /> */}
            <img src={MyLogo} alt="" className="rounded-full w-24 h-10" />
          </Link>
        </div>
        <div className="flex max-w-sm w-full xs:-mr-4 border justify-between  rounded-full items-center focus:shadow">

          <input
            type="text"
            className="w-full outline-none"
            placeholder="Rechercher un produit"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg w-12 h-8 min-w-[20px] bg-purple-400 flex items-center justify-center rounded-r-full text-white">
            <GrFormSearch />
          </div>
        </div>
        

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
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
            )}
            {menuDisplay && (
              <div className="absolute bg-white  bottom-0 h-fit top-11 p-2  shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to="/admin-panel/all-products"
                      className="whitespace-nowrap md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          <Link to={"/about"} className="font-semibold text-purple-300 sx:-mr-4 hover:text-purple-700">
          <About />
          </Link>
          <Link to={"/contact"} className="font-semibold xs:-mr-4 text-purple-300 hover:text-purple-700">
          <Contact />
          </Link>

          <Link to={"/cart"} className="text-2xl relative xs:-mr-4">
            <span className="">
              {" "}
              <BsCart4 />
            </span>
            {user?._id && (
              <div className="bg-red-400 h-5 rounded-full text-white w-5 p-1 items-center text-center justify-center absolute -top-2 -right-2">
                <p className="text-sm">{context?.carProductCount}</p>
              </div>
            )}
          </Link>
          <div>
            {user?._id ? (
              <button
                onClick={handlerLogout}
                className="px-3 py-1 xs:-mr-2 rounded-full text-white bg-purple-400 hover:bg-purple-700"
              >
                Déconnexion
              </button>
            ) : (
              <Link
                to="/login"
                type=""
                className="px-3 py-1 rounded-full text-white bg-purple-400 hover:bg-purple-700"
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
