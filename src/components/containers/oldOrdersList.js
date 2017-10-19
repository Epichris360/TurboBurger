import React, { Component } from 'react'
import NavBar               from './NavBar'
import { oldOrders }        from '../../utils/firebaseApp'

class oldOrdersList extends Component{
    constructor(props){
        super(props)
        this.state = {
            oldOrders:[],
            loading:true
        }
    }
    componentDidMount(){
        oldOrders.on('value', snap => {
            let oldOrders = []
            snap.forEach(o => {
                const { id , name, orderProducts, total, pay, 
                        created_at, updated_at, started, done, to_go, table } = o.val()
                const serverKey = o.key
                oldOrders.push({ id , name, orderProducts, total, pay, 
                                  created_at, updated_at, started, done, 
                                  to_go, table, serverKey })
            })
            this.setState({oldOrders})
            this.setState({loading:false} )
        })
    }
    render(){
        return(
            <div>
                <NavBar />
                <div className="container">
                    <h1>List of Old Orders</h1>
                    <hr/>
                    {
                        this.state.loading ? <h1>Loading.....</h1>:
                        <div>
                            {
                                this.state.oldOrders.map( (old, i) => {
                                    return(
                                        <li key={i}>{`name: ${old.name} | created_at: ${old.created_at}`}</li>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            </div>
            
        )
    }
}

export default oldOrdersList