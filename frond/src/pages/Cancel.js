import React from 'react'
import { Link } from 'react-router-dom'
import CANCEL from "../assest/cancle.jpg"

const Cancel = () => {
  return (
    
        <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
        <img src={CANCEL} alt=""  width={150}  height={150}
        className='mix-blend-normal' />
        <p className="text-red-600 font-bold text-xl">Votre payement a été annulé</p>
        <Link to={"/cart"} className="p-2 px-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white">
        Retour au panier
         </Link>
  
    </div>
  )
}

export default Cancel