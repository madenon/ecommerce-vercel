import React, { useEffect, useState } from 'react'
import SummaryApi from '../commun'

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])

  const fetchAllUers = async()=>{
    const fetchData  = await fetch(SummaryApi.allUser.url,{
      method:SummaryApi.allUser.method,
      credentials:'include'
    })
    const  dataResponse = await  fetchData.json();
    console.groupEnd(dataResponse);
  }
  useEffect(()=>{
fetchAllUers()
  },[])
  return (
    <div>AllUsers</div>
  )
}

export default AllUsers