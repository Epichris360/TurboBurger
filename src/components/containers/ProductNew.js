import React, { Component } from 'react'
import { connect }          from 'react-redux'
import { TurboClient }      from '../../utils'
import Dropzone             from 'react-dropzone'
import superagent           from 'superagent'
import { products }         from '../../utils/firebaseApp'
import NavBar               from './NavBar'


class ProductNew extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:'',
            price:0,
            imgUrl:'',
            imageUploaded:false,
            error: false, submitted:false
        }
    }
    submitProduct(){
        if( this.state.name != '' && this.state.price > 0 && this.state.imgUrl != '' ){
            let product = {
                name:this.state.name,
                price:this.state.price,
                imgUrl:this.state.imgUrl
            }
            products.push(product)
            this.setState({submitted:true})
            this.props.history.push('/products')
        }else{
            this.setState({error:true})
        }
        
    }
    uploadFile(files){

		const file = files[0]
        this.setState({imageUploaded:false})
		TurboClient.uploadFile(file)
		.then(data => {
            this.setState( { imgUrl: data.result.url } )
            this.setState( { imageUploaded:true } )
            //console.log('data',data)
		})
		.catch(err => {
			console.log('upload ERROR: ' + err.message)
        })
        

	}
    render(){
        return(
            <div>
                <NavBar />
                <div  className="container">
                    {
                        this.state.error ? 
                        <div className="alert alert-danger">
                            <strong>Error!</strong> Check your inputs. 
                            <button className="btn btn-danger btn-xs" onClick={ () => this.setState({error:false})}>x</button>
                        </div> : null
                    }
                    {
                        this.state.submitted ? 
                        <div className="alert alert-success">
                            <strong>Success!</strong> The Product was created
                            <button className="btn btn-danger btn-xs" onClick={ () => this.setState({submitted:false})}>x</button>
                        </div> : null
                    }
                    <h1>New Product!</h1>
                    <hr/>
                    <input type="text" 
                        className="form-control" 
                        placeholder="Product Name. Keep it short!"
                        onChange={ e => this.setState({name: e.target.value}) }
                    />
                    <br/>
                    <input type="number" 
                        className="form-control" 
                        placeholder="Put the price here!"
                        onChange={ e => this.setState({price: e.target.value}) }
                    />
                    <br/>
                    <h3>Upload File</h3>
                    {
                        this.state.imageUploaded ? <h3 style={{color:'red'}}>Image Uploaded!</h3> : null
                    }
                    <Dropzone className="btn btn-primary" onDrop={this.uploadFile.bind(this)}>
                        <strong style={{color:'white'}}>Select File</strong>
                    </Dropzone>

                    <br/>
                    <br/>
                    <br/>
                    <button className="btn btn-success" onClick={ () => this.submitProduct() } disabled={!this.state.imageUploaded}>
                        Create the Product!
                    </button>
                </div>
            </div>
        )
    }
}

export default ProductNew