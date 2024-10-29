import { Outlet } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import SummaryApi from "./commun";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {

  const dispatch = useDispatch()
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
  useEffect(() => {
    //users details
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails
        }}
      >
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
