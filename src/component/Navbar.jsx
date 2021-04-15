import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() { 
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container-fluid">
                <Link to='/' className="navbar-brand" style={{fontFamily: 'Bad Script', fontWeight: 'bold', color: 'white', fontSize: '25px'}}>
                    WOR
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo02">
                    <ul class="navbar-nav justify-content-center">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Today</Link>
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
    </nav>)
};
export default Navbar;