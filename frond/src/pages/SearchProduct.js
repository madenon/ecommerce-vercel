import React from 'react'
import { useParams } from 'react-router-dom'

const SearchProduct = () => {
    const query = useParams()
    console.log("query",query)
  return (
    <div>SearchProduct</div>
  )
}

export default SearchProduct