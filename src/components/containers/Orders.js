import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { products }         from '../../utils/firebaseApp'
import { orders }           from '../../utils/firebaseApp'
import { v4 }               from 'uuid'
import actions              from '../../actions'

class Orders extends Component{
    constructor(props){
        super(props)
        this.state = this.getInitialState()
    }
    componentDidMount(){
        products.on('value', snap => {
            let products = []
            snap.forEach(prod => {
                const { name, price, imgUrl } = prod.val()
                const serverKey = prod.key
                products.push({ name, price, imgUrl, serverKey })
            })
            this.props.allProducts(products)
            this.setState({loading:false})
        })
    }
    getInitialState(){
        const initialState = {
            name:'', loading:true, orderProducts:[], total:0,
            submitStatus: false, pay , name:'', to_go:true, table:'', success: false, successMsg:''
        }
        return initialState
    }
    resetState(){
        this.setState(this.getInitialState())
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
    submitOrder(){
        const order = {
            id: v4(),
            name:this.state.name,
            orderProducts:this.state.orderProducts,
            total:this.state.total,
            pay: this.state.pay,
            created_at: new Date().toString(),
            updated_at: new Date().toString(),
            started: false,
            done:false,
            to_go:this.state.to_go,
            table:this.state.table
        }
        orders.push(order)
        this.resetState()
        this.setState({successMsg: "The Order was Created!"})
        this.setState({success: true, loading: false})
    }
    paying(e){
        this.setState({pay: parseFloat( e.target.value ) })
        setTimeout( () => {
            if(this.state.pay >= this.state.total){
                this.setState({submitStatus: true})
            }else{
                this.setState({submitStatus: false})
            }
        },50)
    }
    toGo(e){
        console.log('e',e.target.value)
        if( e.target.value == "true" ){
            this.setState({to_go: true})
        }else{
            this.setState({to_go: false})
        }
    }
    render(){
        return(
            <div>
                <h1>Turbo Burger</h1>
                <h3>Make an order</h3>
                {
                    this.state.success ? 
                    <div className="alert alert-success">
                        <strong>Success!</strong> { this.state.successMsg } 
                        <button className="btn btn-danger btn-xs" onClick={ ()=>this.setState({success:false}) }>x</button>
                    </div> : null
                }
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
                    <h2>Total:$ {this.state.total}</h2>
                </div>
                </div>
                    
                <div className="col-md-8">
                    <div className="row">
                        <input type="text" placeholder="Name!" className="form-control " onChange={ e => this.setState({name: e.target.value}) }/>
                    </div>
                    <div className="row">

                        {
                            this.state.loading ? <h1>Loading...</h1> :
                            
                                <div>
                                    {
                                        this.props.products.map( (prod,i) => {
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

                    <div className="pull-right">
                        <input type="number" 
                            className="form-control" placeholder="$$$$$$$"
                            onChange={ e => this.paying(e) }
                            value={this.state.pay}
                        />
                        <button className="btn btn-success btn-lg" disabled={!this.state.submitStatus} onClick={ () => this.submitOrder() }>
                            Create Order
                        </button>

                        <select className="btn btn-default" onChange={ e => this.toGo(e) }>
                            <option value={true}>To Go?</option>
                            <option value={false}>To Stay?</option>
                        </select>
                        <br/> <br/>
                        {
                            !this.state.to_go ? 
                                <input 
                                    type="number" 
                                    className="form-control" 
                                    onChange={ e => this.setState({table: parseInt(e.target.value) }) } 
                                    placeholder="Table Number"
                                /> :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { products } = state
    return{
        products
    }
}

const dispatchToProps = dispatch => {
    return{
        allProducts: params => dispatch(actions.allProducts(params))
    }
}

export default connect(mapStateToProps,dispatchToProps)(Orders)