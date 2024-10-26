import React, { useState } from "react";
import ROLE from "../commun/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../commun";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, callFunc, userId, role, onClose }) => {
  const [userRole, setUserRole] = useState(role);

  const handelChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    const fecthResponse = await fetch(SummaryApi.apdateUser.url, {
      method: SummaryApi.apdateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fecthResponse.json();
    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc()
    }
  };
  return (
    <div className="fixed top-0 bottom-0 right-0  left-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-40">
      <div className="mx-auto bg-white shadow-md p-4  w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4">Changer le role des utilisateurs </h1>
        <p>Nom: {name}</p>
        <p>Email:{email} </p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handelChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option key={el} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto 
    block border p-2 rounded-full py-1 px-2  bg-purple-600 text-white hover:bg-purple-700"
          onClick={updateUserRole}
        >
          Changer Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
