import React from 'react'
import { Link } from 'react-router-dom';
import './navbar.scss';
export default function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar__list">
                    <div className="navbar__list-item"><Link to="/">Home</Link></div>
                    <div className="navbar__list-item"><Link to="/creation">Creation</Link></div>
                    <div className="navbar__list-item"><Link to="/about">About</Link></div>
                </div>
            </nav>
        </div>
    )
}