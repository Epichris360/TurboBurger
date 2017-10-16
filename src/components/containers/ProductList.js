import React, { Component } from 'react'
import { products }         from '../../utils/firebaseApp'

class ProductList extends Component{
    constructor(props){
        super(props)
        this.state = {
            products: [],
            loading:true
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
    render(){
        return(
            <div>
                product list
                <hr/>
                {
                    this.state.loading ? <h1>Loading....</h1> :
                    <div>
                            
                        {
                            this.state.products.map( (p,i) => {
                                return(
                                    <li key={i}>
                                        <img src={p.imgUrl} alt=""/>
                                    </li>
                                )
                            })
                        }
                            
                    </div> 
                }
            </div>
        )
    }
}

export default ProductList