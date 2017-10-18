import React, { Component } from 'react'
import { products }         from '../../utils/firebaseApp'

class ProductList extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            loading:true,
            editProduct:{},
            editTrue:false,
            updateName:'',
            updatePrice:0,
            updateImg:''
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
    pickProdcut(p){
        this.setState({ editTrue: true, editProduct:p, 
                        updateName:p.name, updatePrice:p.price, updateImg:p.imgUrl })
    }
    submitUpdate(){
        const { updateName, updatePrice, updateImg } = this.state
        products.child(this.state.editProduct.serverKey).update({
            name: updateName, price: updatePrice, imgUrl: updateImg
        })
        this.setState({editProduct: {}, editTrue: false})
    }
    render(){
        return(
            <div className="container">
                
                <hr/>
                <div className="col-md-6 col-xs-6">
                    {
                        this.state.editTrue ? 
                        <div>
                            <h2>Product Update!</h2>
                            <input type="text" 
                                className="form-control" placeholder="Name"
                                onChange={ e => this.setState({updateName: e.target.value}) }
                                value={this.state.updateName}
                            />
                            <br/>
                            <input type="number" 
                                className="form-control" placeholder="Price"
                                onChange={ e => this.setState({updatePrice: e.target.value}) }
                                value={this.state.updatePrice}
                            />
                            <br/>
                            <input type="file"/>

                            <button 
                                className="btn btn-success"
                                onClick={ () => this.submitUpdate() }
                            >Update It</button>
                        </div> : <h1>Pick One</h1>
                    }
                    
                </div>
                <div className="col-md-6 col-xs-6">
                    <h2>product list</h2>
                    {
                        this.state.loading ? <h1>Loading....</h1> :
                        <div>
                                
                            {
                                this.state.products.map( (p,i) => {
                                    return(
                                        
                                        <button key={i} className="btn btn-default " 
                                                style={{ margin:'5px', height:'100px', width:'100px'}} 
                                                onClick={ () => console.log('this is a log') } >
                                            <img  src={p.imgUrl} alt=""/>
                                        </button>
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

export default ProductList