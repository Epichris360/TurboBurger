import React, { Component } from 'react'

const bgimg = {

    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100%',
    marginTop: '-20px'
}

const caption =  {
    position: 'absolute',
    left: 0,
    top: '50%',
    width: '100%',
    textAlign: 'center',
    color: '#000'
}

const border = {
    backgroundColor: '#111',
    color: '#fff',
    padding: '18px',
    fontSize: '25px',
    letterSpacing: '10px'
}

class MainPage extends Component{
    render(){
        return(
            <div style={bgimg}>
                <img src="https://images.unsplash.com/photo-1477259004500-ce2463b979ca?dpr=1&auto=format&w=1800&q=60&cs=tinysrgb" alt=""/>
                <div style={caption} >
                    <span style={border}>TurboBurger</span>
                    <br/>
                    <br/>
                    <br/>
                    <span style={border}>The Amazing POS of </span>
                    <br/>
                    <br/>
                    <br/>
                    <span style={border} >TurboPizza INC.</span>
                </div>
            </div>
        )
    }
}

export default MainPage