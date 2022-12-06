import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <>
        <div className="container">
          <div className="footer-bottom">
              <Link to="/"><span>Art API</span></Link>
          </div>
        </div>
    </>
  )
}

export default Footer