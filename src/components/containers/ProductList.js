import React, { Component } from 'react'
import { products }         from '../../utils/firebaseApp'
import { TurboClient }      from '../../utils'
import Dropzone             from 'react-dropzone'
import superagent           from 'superagent'

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
            updateImg:'',
            imageUploaded:false,
            disable:true
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
    pickProduct(p){
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
    uploadFile(files){
		const file = files[0]
        this.setState({imageUploaded:false,disable:false})
		TurboClient.uploadFile(file)
		.then(data => {
            this.setState({updateImg: data.result.url})
            this.setState({imageUploaded:true, disable:true})
		})
		.catch(err => {
			console.log('upload ERROR: ' + err.message)
        })
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

                            <h3>Upload File</h3>
                            {
                                this.state.imageUploaded ? <h3 style={{color:'red'}}>Image Uploaded!</h3> : null
                            }
                            <Dropzone className="btn btn-primary" onDrop={this.uploadFile.bind(this)}>
                                <strong style={{color:'white'}}>Select File</strong>
                            </Dropzone>
                            <br/><br/>
                            <button 
                                className="btn btn-success"
                                disabled={!this.state.disable}
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
                                                onClick={ () => this.pickProduct(p) } >
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