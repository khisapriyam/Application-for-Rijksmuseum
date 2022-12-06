import React from 'react'
import Images from '../Images/Images'
import './Paginations.css'


const Paginations = ({ fetchedData }) => {


  return (
    <>
      <Images image={fetchedData}></Images>
    </>
  )
}

export default Paginations