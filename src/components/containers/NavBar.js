import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component{
    render(){
        return(
            <div >
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">TurboBurger</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="signin" >SignIn</Link></li>
                            <li><Link to="signup" >SignUp</Link></li>
                            
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" >Options
                                <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="/product-new">New Product!</Link></li>
                                    <li><Link to="/products">Products</Link></li>
                                    <li><Link to="/order-new">New Order</Link></li>
                                    <li><Link to="/live-orders">Live Orders!</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
                
            </div>
        )
    }
}

export default NavBar