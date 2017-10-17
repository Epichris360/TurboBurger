import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAfxVyBC27fLALwtFgSca3mWOFTc6W9uxc",
    authDomain: "turboburger-50ac6.firebaseapp.com",
    databaseURL: "https://turboburger-50ac6.firebaseio.com",
    projectId: "turboburger-50ac6",
    storageBucket: "",
    messagingSenderId: "1082502376622"
}

export const firebaseApp = firebase.initializeApp(config)

export const orders = firebase.database().ref('orders')

export const products = firebase.database().ref('products')

export const oldOrders = firebase.database().ref('oldOrders')