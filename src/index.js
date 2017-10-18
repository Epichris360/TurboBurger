import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import { Provider } from 'react-redux'
import { Orders, SignIn, SignUp, NavBar,
		ProductNew, ProductList, MainPage, liveOrders } from './components/containers'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is the entry point of the React app with Redux
	already implemented. The Intro component is the 
	visual content and most likely, you will want 
	to remove it and replace with your own visual content.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/


const app = (
	<Provider store={store.configure(null)}>
		<Router>
			<div>
				<NavBar />
				<div>
					
					<div>
						<Switch>
							<Route exact path="/" 		component={MainPage}   />
							<Route path="/order-new" 	component={Orders}     />
							<Route path="/signin" 		component={SignIn}     />
							<Route path="/signup" 		component={SignUp}     />
							<Route path="/product-new"  component={ProductNew} />
							<Route path="/products"     component={ProductList}/>
							<Route path="/live-orders"  component={liveOrders} />
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	</Provider>
)



ReactDOM.render(app, document.getElementById('root'))