import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() { 
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" >
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo02">
                    <ul className="navbar-nav justify-content-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link" >Today</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hourly" className="nav-link">Hourly</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/daily" className="nav-link">Daily</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};
export default Navbar;