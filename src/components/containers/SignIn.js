import React, { Component } from 'react'
import {firebaseApp} from '../../utils/firebaseApp'
import { Link }from 'react-router-dom'

class SignIn extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
            error:{ message:'' }
        }
    }

    SignIn(){
        console.log('this.state',this.state)
        const { email, password } = this.state
        firebaseApp.auth().signInWithEmailAndPassword(email, password)
            .then(data => {
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({error})
            })
    }

    render(){
        return(
            <div  className="container" style={{margin: '5%'}}>
                <h2>Sign In</h2>
                <div className="form-group">
                    <input className="form-control"
                    placeholder="Email" type="text"
                    style={{marginRight: '5px'}}
                    onChange={ event => this.setState({email: event.target.value}) }/>
                    <br />
                    <input className="form-control" 
                    placeholder="password" type="password"
                    style={{marginRight: '5px'}}
                    onChange={ event => this.setState({password: event.target.value}) }/>
                    <br />
                    <button className="btn btn-primary"
                    type="button" onClick={()=> this.SignIn()}>SignIn</button>
                </div>
                <div>{this.state.error.message}</div>
                <br />
                <div><Link to="/signup">Signup Instead</Link></div>
            </div>
        )
    }
}

export default SignIn