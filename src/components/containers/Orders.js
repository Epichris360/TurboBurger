import React, { Component } from 'react'
import { connect } from 'react-redux'
import { orders } from '../../utils/firebaseApp'
class Orders extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:''
        }  
    }
    submitOrder(){
        console.log('order?',this.state.name)
        orders.push({something: this.state.name})
        .then(data => {

        })
        .catch(err => {
            throw err
        })
    }
    render(){
        return(
            <div>
                <h1>Turbo Burger</h1>
                <h3>Make an order</h3>

                <br/>
                <input type="text" 
                    className="form-control"
                    placeholder="type something here"
                    onChange={ e => this.setState({name: e.target.value}) }
                    value={ this.state.name }
                />
                <button className="btn btn-success" onClick={this.submitOrder.bind(this)}>
                    Order
                </button>
            </div>
        )
    }
}

export default connect(null,null)(Orders)