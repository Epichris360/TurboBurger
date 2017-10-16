import React, { Component } from 'react'
import { connect } from 'react-redux'
import { products } from '../../utils/firebaseApp'
class Orders extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            products:[],
            loading:true,
            orderProducts:[],
            total:0
        }  
    }
    componentDidMount(){
        products.on('value', snap => {
            let products = []
            snap.forEach(prod => {
                const { name, price, imgUrl } = prod.val()
                const serverKey = prod.key
                products.push({ name, price, imgUrl, serverKey })
            })
            //console.log('goals', goals)
            this.setState({products})
            this.setState({loading:false})
        })
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
    clickButton(which){
        console.log('button',which)
    }
    newOrder(prod){
        let order = { name: prod.name, price: prod.price, qty:1, prodTotal: prod.price }
        let app = false
        for(var i = 0 ; i < this.state.orderProducts.length ; i++){
            if(this.state.orderProducts[i].name == prod.name){
                app = true
                break
            }
        }
        if( !app ){
            let { orderProducts } = this.state
            orderProducts.push(order)
            this.setState({orderProducts})
            
        }
        this.changeTotal()
    }
    qtyChange(cat,name){
        console.log('cat',cat,'name',name)
        let orderProducts = this.state.orderProducts.map( (op) => {
            if( op.name == name ){
                return this.orderCat(op,cat)
            }else{
                return op
            }
        })
        this.setState({orderProducts})
        this.changeTotal()
    }
    orderCat(op, cat){
        if(cat == "minus" && op.qty > 1 ){
            op.qty--
            op.prodTotal = op.qty * op.price
            return op
        }else if( cat == "plus" ){
            op.qty++
            op.prodTotal = op.qty * op.price
            return op
        }
        return op
    }
    removeProduct(product){
        let orderProducts = this.state.orderProducts.filter( op => { return op.name != product.name })
        this.setState({orderProducts})
        setTimeout( () => {
            this.changeTotal()
        },50)
         
    }
    changeTotal(){
        let total = 0
        this.state.orderProducts.map( op => {
            total += ( op.qty * op.price )
        })
        this.setState({total})
    }
    render(){
        return(
            <div>
                <h1>Turbo Burger</h1>
                <h3>Make an order</h3>
                <div className="col-md-4">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.orderProducts.map( ( op,i ) => {
                                return(
                                    <tr key={i}>
                                        <td>{ op.name }</td>
                                        <td>{ op.price }</td>
                                        <td> 
                                            <button className="btn btn-default btn-xs" onClick={ () => this.qtyChange('minus', op.name ) }>-</button> 
                                                { op.qty }  
                                            <button className="btn btn-default btn-xs" onClick={ () => this.qtyChange('plus', op.name ) }>+</button> 
                                        </td>
                                        <td>{ op.prodTotal }</td>
                                        <td>
                                            <button className="btn btn-danger btn-xs" onClick={ () => this.removeProduct(op) } >
                                                x
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>
                <div className="pull-right">
                    <h1>Total:$ {this.state.total}</h1>
                </div>
                </div>
                    
                <div className="col-md-8">
                    <div className="row">
                        <input type="text" placeholder="Search! + Enter!" className="form-control "/>
                    </div>
                    <div className="row">

                        {
                            this.state.loading ? <h1>Loading...</h1> :
                            
                                <div>
                                    {
                                        this.state.products.map( (prod,i) => {
                                            return(

                                                <button key={i} className="btn btn-default " 
                                                        style={{ margin:'5px', height:'100px', width:'100px'}} 
                                                        onClick={ () => this.newOrder(prod) }>
                                                    <img  src={prod.imgUrl} alt=""/>
                                                </button>

                                            )
                                        })
                                    }
                                </div>


                        }


                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null,null)(Orders)