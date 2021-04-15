import React from 'react'
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <section id="footer bg-primary" >
          <br/>  
        <div className="container-fluid bg-primary">
            <div className="row text-center text-xs-center text-sm-left text-md-left">
                
                <div className="col-sm-6 col-md-6"> <br/>
                    <h5>Quick links</h5>
                    <div className = "row">
                        <div className = "col-sm-4">
                        <Link to = "/" className = "nav-link" style={{color: 'white'}}>Current</Link>
                        <Link to = "/daily" className = "nav-link" style={{color: 'white'}}>Daily</Link>
                        <Link to = "/hourly" className = "nav-link" style={{color: 'white'}}>Hourly</Link>
                    </div>
                    </div>
                    
                    
                
                  
                </div>
            </div>
                
            <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
            
                <p className="h6">© 2021 Copyright: WOR</p>
            </div>
            
        </div>
        </div>
    </section>
    )
}

export default Footer
