import React, { Component } from 'react'
import { orders }           from '../../utils/firebaseApp'
import { oldOrders }        from '../../utils/firebaseApp'

class liveOrders extends Component{
    constructor(props){
        super(props)
        this.state = {
            liveOrders:[],
            loading:true
        }
    }
    componentDidMount(){
        orders.on('value', snap => {
            let liveOrders = []
            snap.forEach(o => {
                const { id , name, orderProducts, total, pay, 
                        created_at, updated_at, started, done, to_go, table } = o.val()
                const serverKey = o.key
                liveOrders.push({ id , name, orderProducts, total, pay, 
                                  created_at, updated_at, started, done, 
                                  to_go, table, serverKey })
            })
            //console.log('liveorders',typeof liveOrders)
            //console.log('liveorders',liveOrders.length)
            //console.log('liveorders',liveOrders)
            this.setState({liveOrders})
            this.setState({loading:false})
        })
    }
    started(lo){
        //console.log('lo',lo)
        orders.child(lo.serverKey).update({started:true})
    }
    done(lo){
        orders.child(lo.serverKey).update({done:true})
    }
    moveOrder(lo){
        orders.child(lo.serverKey).delete()
        oldOrders.push(lo)
    }
    render(){
        return(
            <div>
                
                <h1>Live Orders</h1>
                <hr/>
                {
                    this.state.loading || this.state.liveOrders.length == 0 ? <h1>Loading....</h1> : 
                
                    <div style={{backgroundColor:'gray', height:'500px',overflow:'auto', overflowX:'hidden' }}>

                        <div className="container">
                            <div className="row" >

                                {
                                    this.state.liveOrders.map( (lo,i) => {
                                        return(
                                            <div key={i} className="col-md-2 panel" style={{height:'470px',width:'200px', margin:'10px',overflow:'scroll',overflowX:'hidden'}}>
                                                <h1>Order Up!</h1>
                                                {
                                                    !lo.started && !lo.done ?
                                                        <button className="btn btn-danger" 
                                                                onClick={()=>this.moveOrder(lo)}>
                                                            Click to Remove
                                                        </button> : null
                                                }

                                                <ul className="list-group" >
                                                {
                                                    lo.orderProducts.map( (op,i) => {
                                                        return(
                                                            <li key={i} className="list-group-item">{op.name} <span className="badge">{op.qty}</span></li>
                                                        )
                                                    })
                                                }
                                                </ul>
                                                    
                                                {
                                                    !lo.started ? 
                                                    <button className="btn btn-success" 
                                                        onClick={ () => this.started(lo)  }>
                                                        Start Order
                                                    </button> : null
                                                }
                                                
                                                {
                                                    lo.started && !lo.done ? 
                                                    <button className="btn btn-danger"
                                                        onClick={ () => this.done(lo) }>
                                                        Stop Order
                                                    </button> : null
                                                }
                                                

                                            </div>
                                        )
                                    })
                                }
                                
                            </div>  
                        </div>

                    </div>
                }

            </div>
        )
    }
}

export default liveOrders