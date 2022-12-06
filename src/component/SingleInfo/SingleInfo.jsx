import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './SingleInfo.css'

const SingleInfo = () => {

  //get image params
  const { objectNumber } = useParams()
 
  //useState for fetching data from API
  const[ imageInfo, setImageInfo ] = useState({
    title : '',
    webImage : '',
    description: '',
    principalMaker: '',
    objectTypes:''
  });
  
  
//fetching individual object data using axios
const loadUserData = async() => { 
  return await axios.get(`https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=2esrTh6M`).then(res => {
    setImageInfo({
      title : res.data.artObject.title,
      webImage : res.data.artObject.webImage,
      description: res.data.artObject.description,
      principalMaker: res.data.artObject.principalMaker,
      objectTypes: res.data.artObject.objectTypes[0]
    })
  })
}

try{
  useEffect(() => {
    loadUserData()
  },[])

}catch(err){
  console.log(err);

}
  
  return (
    <>
      <div className="container my-5">
        <div className="back-btn">
          <p><i className="fa-solid fa-less-than"></i></p>
          <Link to='/'><p className='back-button'>Back to the List</p></Link>
        </div>
        <div className="row card-img-top">
          <div className="col-lg-12">
            <div className="card card-single">
              <img src={imageInfo.webImage.url} className="card-img" alt="..."/>
                <div className="card-img-overlay">
                  <h5 className="card-title">{imageInfo.title}</h5>
                </div>
              </div>
              <div className="image-info">
                <p className='title'>Title</p>
                <h6>{imageInfo.title}</h6>
                <hr />
                <p className='title'>Artist</p>
                <h6>{imageInfo.principalMaker}</h6>
                <hr />
                <p className='title'>Object Type</p>
                <h6>{imageInfo.objectTypes}</h6>
                <hr />
                <p className='title'>Measurements</p>
                <h6>Height {imageInfo.webImage.height} cm X Width {imageInfo.webImage.width} cm X Depth {imageInfo.webImage.offsetPercentageX} cm</h6>
                <hr />
                <p className='title'>Description</p>
                {
                  (imageInfo.description !== '')?<h6>{imageInfo.description}</h6> : <h6>No description available</h6>
                }
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default SingleInfo