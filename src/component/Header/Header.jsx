import React from 'react'
import './Header.css'
import artlogo from '../Image/artlogo.png'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'

const Header = ({ fetchedData, setFetchedData}) => {

    //filter data state
    const [ filterData, setFilterData] = useState([])

    //search query state
    const[ query, setQuery ] = useState('')

    //function for fetching collection of images from API
    const searchData = async () => {
        return await fetch(`https://www.rijksmuseum.nl/api/nl/collection/?q=${query}&key=2esrTh6M&ps=50`).then((res) => 
            res.json()
        )  
    }
    try{
        useEffect(() => {
            searchData().then(({artObjects}) => {
                setFetchedData(artObjects)
                setFilterData(artObjects)   
              })
        },[])
            

    }catch(err){
        console.log(err)
    }

    //search data function
    const handleSearch = (event) => {
        const getSearch = event.target.value
        
        if(getSearch.length > 0){
            const getSearch = event.target.value
            const searchData = fetchedData.filter((item) => item.title.toLowerCase().includes(getSearch))
            setFetchedData(searchData)

        }else{
            setFetchedData(filterData)
        }
        setQuery(getSearch)
    }
  
  return (
    <>
        <Navbar expand="lg">
            <Container fluid className='header-info'>
                <Navbar.Brand href="#"><img src={ artlogo } alt="" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll>
                    <Nav.Link href="#"><h3>Art API</h3></Nav.Link>  
                </Nav>
                    <input type="text" placeholder='Please type in your search' value={ query } onChange={(e) =>handleSearch(e)}/>
                    <Button type='submit'><span>Search</span></Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}

export default Header