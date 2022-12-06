import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import Paginations from './component/Paginations/Paginations';
import SingleInfo from './component/SingleInfo/SingleInfo';


function App() {

//useState for fetching data from API
  const[fetchedData, setFetchedData] = useState([]);

//function for fetching collection of images from API
  const getApi = async () => {
    return await fetch('https://www.rijksmuseum.nl/api/nl/collection/?key=2esrTh6M&ps=50').then((res) => 
      res.json()
    )  
  }
  try{
    useEffect(() => {
      getApi().then(({artObjects}) => {
        setFetchedData(artObjects)
      })
        
    },[])
  }catch(err){
    console.log(err);
  }


  return (
   <>
    <BrowserRouter>
      <Header setFetchedData={ setFetchedData } fetchedData={ fetchedData }></Header>
        <Routes>
          <Route path='/' element={<Paginations fetchedData={ fetchedData }/>}></Route>
          <Route path='/single-info/:objectNumber' element={<SingleInfo />}></Route>
        </Routes>
      <Footer></Footer>
    </BrowserRouter>
    
   </>
  );
}

export default App;
