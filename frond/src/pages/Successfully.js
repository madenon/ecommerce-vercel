import React from 'react'
import SUCCESS  from "../assest/success.png"
import { Link } from 'react-router-dom'

const Successfully = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
        <img src={SUCCESS} alt=""  width={150}  height={150} />
        <p className="text-green-600 font-bold text-xl">Félicitation votre a bien  été validé</p>
        <Link to={"/order"} className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white">
        Voir mes commandes
         </Link>
    </div>
  )
}

export default Successfully