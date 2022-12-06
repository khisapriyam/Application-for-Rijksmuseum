import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom';
import './Images.css'

const Images = ({image}) => {
    
    //useStates
    const [ currentItems, setCurrentItems] = useState([]);
    const [ pageCount, setPageCount ] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    try{
        useEffect(() => {
            const endOffset = itemOffset + itemsPerPage;
            setCurrentItems(image.slice(itemOffset, endOffset));
            setPageCount(Math.ceil(image.length / itemsPerPage));
    
        },[itemOffset,pageCount,image])
        

    }catch(err){
        console.log(err);
    }
    
    //page change function
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % image.length;
        
        setItemOffset(newOffset);
    };

  return (
    <>
      <div className="images">
        <div className="container my-5">
          <Link to='/'><h3 className='all-artwork'>All artwork</h3></Link>
          <div className="row ">
            {
              currentItems.map( images => 
                <div className="col-md-4 cards">
                  <div className="card ">
                      <img src={images.webImage.url} className="card-img" alt="..."/>
                      <div className="card-img-overlay body-text">
                      <Link to={`/single-info/${images.objectNumber}`}> <h5 className="card-title">{images.title}</h5></Link>
                      </div>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
      
      <div className="container">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLabel="<"
          renderOnZeroPageCount={null}
          containerClassName ="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="active"
          breakLinkClassName='dot'
        />
        {/* <Footer></Footer> */}
      </div>
    </>
  );
  
  }

export default Images