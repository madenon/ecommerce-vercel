import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase";
import SummaryApi from "../commun";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    profilePic: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const password = data.password;
      const passwordConfirm = data.password2;
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (password !== passwordConfirm) {
        const dataApi = await dataResponse.json();
        toast.error(dataApi.message);
      }

      if (password === passwordConfirm) {
        const dataApi = await dataResponse.json();
        toast.success(dataApi.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(data.message.error);
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: imagePic,
      };
    });
  };

  return (
    <section id="login" className="shadow-sm">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4w-full max-w-sm mx-auto">
          <div className="w-20 h-20  mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data?.profilePic || loginIcons} alt="Icon login" />
            </div>
            <form>
              <label>
                <div className="text-xs  bg-slate-200 bg-opacity-80 pb-4 cursor-pointer pt-2 text-center absolute bottom-0 w-full">
                  Télécharger une image de couverture
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                  
                />
              </label>
            </form>
          </div>

          <form onSubmit={handleSubmit} className="pt-6 flex-col gap-2">
            <div className="grid">
              <label>Nom: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="entrer votre Nom complet"
                  className="w-full h-full outline-none bg-transparent"
                  autoComplete="current-name"

                />
              </div>
            </div>
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
                  autoComplete="current-email"

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
                  autoComplete="current-password"

                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirmer Mot de passe: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  value={data.password2}
                  onChange={handleOnChange}
                  name="password2"
                  type={showConfirPassword ? "text" : "password"}
                  placeholder="Confirmez votre mot de passe"
                  className="w-full h-full outline-none bg-transparent"
                  autoComplete="current-password2"

                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>{showConfirPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <button
              className="bg-red-400 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 
            transition-all mx-auto block mt-6"
            >
              S'sinscrire
            </button>
          </form>
          <p className="my-5">
            Avez-vous déjà iun compte ?
            <Link to={"/login"} className="text-red-400 hover:text-red-700 m-1">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
