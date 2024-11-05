import { Outlet } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./commun";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {

  const dispatch = useDispatch()
  const [carProductCount,setCartProductCount]= useState(0)
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if(dataApi.success){ // rapport avec userDetails backen true
      dispatch(setUserDetails(dataApi.data))

    }

  };
  const fetchUserAddToCart = async()=>{
    
    const dataResponse = await fetch(SummaryApi.addToCartCount.url, {
      method: SummaryApi.addToCartCount.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
      setCartProductCount(dataApi?.data?.count)
  }
  useEffect(() => {
    //users details
    fetchUserDetails();
    // User cart product
    fetchUserAddToCart()
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails,// user details
          carProductCount,// current user 
          fetchUserAddToCart,// add to cart
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
