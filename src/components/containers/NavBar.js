import React, { Component } from 'react'
import { Link }             from 'react-router-dom'
import { connect }          from 'react-redux'
import { firebaseApp }      from '../../utils/firebaseApp'
import actions              from '../../actions'

class NavBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    signOut(){
        firebaseApp.auth().signOut()
        .then(data => {
            this.props.loggout()
            //this.props.history.push('/')
            location.reload('/')
        })
        .catch(err =>{
            console.log('err',err.message)
        })
    }
    render(){
        return(

                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">TurboBurger</Link>
                        </div>
                        <ul className="nav navbar-nav">
                            {
                                this.props.user.email == '' ? 
                                    <li><Link to="signin" >SignIn</Link></li> : null
                            }
                            {
                                this.props.user.email == '' ? 
                                    <li><Link to="signup" >SignUp</Link></li>: null
                            }
                            {
                                this.props.user.email != '' ?
                                    <li><a onClick={ this.signOut.bind(this) } >Log out</a></li> : null
                            }
                            {
                                this.props.user.email != '' ?
                                    <li className="dropdown">
                                        <a className="dropdown-toggle" data-toggle="dropdown" >Options
                                        <span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><Link to="/product-new">New Product!</Link></li>
                                            <li><Link to="/products">Products</Link></li>
                                            <li><Link to="/order-new">New Order</Link></li>
                                            <li><Link to="/live-orders">Live Orders!</Link></li>
                                        </ul>
                                    </li> : null
                            }
                            
                        </ul>
                    </div>
                </nav>
                
        )
    }
}
const mapStateToProps = state => {
    const { user } = state
    return{
        user
    }
}

const dispatchToProps = dispatch => {
    return{
        loggout: () => dispatch(actions.loggout())
    }
}


export default connect(mapStateToProps,dispatchToProps)(NavBar)