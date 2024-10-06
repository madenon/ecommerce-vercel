import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  console.log('data', data)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e)=>{
    e.preventDefault()

  }

  return (
    <section id="login" className="shadow-sm">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4w-full max-w-sm mx-auto">
          <div className="w-20 h-20  mx-auto">
            <img src={loginIcons} alt="Icon login" />
          </div>

          <form onSubmit={handleSubmit} className="pt-6 flex-col gap-2">
            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="entrer votre email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Mot de passe: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  value={data.password}
                  onChange={handleOnChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="entrer votre mot de passe"
                  className="w-full h-full outline-none bg-transparent"
                
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-700"
              >
                Mot de passe oublié
              </Link>
            </div>

            <button
              className="bg-red-400 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 
            transition-all mx-auto block mt-6"
            >
              Connexion
            </button>
          </form>
          <p className="my-5">
            Vous n'avez pas de compte ?
            <Link to={"/register"} className="text-red-400 hover:text-red-700 m-1">
              S'sinscrire
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
