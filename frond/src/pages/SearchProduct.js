import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../commun'
import VerticlaCard from '../components/VerticlaCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("query",query.search)

    const fectProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataReseponse = await response.json();
        setLoading(false)
        setData(dataReseponse.data)

    }

    useEffect(()=>{
        fectProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
       {
     loading &&(
        <p className='text-lg text-center'>Chargement...</p>
     )
}
        <p className="">Résultat de recherches {data.length} </p>
     { data.length ===0 && loading && (
             <p className='bg-white text-lg text-center p-4'>Aucune donnée ne corresponds à vos recherches...</p>
     )}
     {
        data.length !==0 && !loading &&(
                 
                    <VerticlaCard loading={loading}  data={data}/>
                
            
        )
     }
    </div>
  )
}

export default SearchProduct