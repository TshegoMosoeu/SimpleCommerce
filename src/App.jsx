import { useState } from 'react'
import './App.css'
import {Routes, Route} from "react-router-dom"
import AuthProvider from './context/AuthContext'

import Home from "./pages/Home"
import Auth from "./pages/Auth"
import ProductDetails from "./pages/ProductDetails"
import Checkout from "./pages/Checkout"
import Navbar from "./components/Navbar"
import CartProvider from './context/CartContext'

/**
 * Root application component that configures context providers, navigation, and route mappings.
 *
 * Renders the application wrapped by AuthProvider and CartProvider, displays the Navbar, and declares routes:
 * "/" → Home, "/auth" → Auth, "/checkout" → Checkout, and "/products/:id" → ProductDetails.
 * @returns {JSX.Element} The app's top-level React element.
 */
function App() {

  return (
    <AuthProvider>
      <CartProvider>
    <div className='app'>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/checkout" element={<Checkout />}/>
        <Route path="/products/:id" element={<ProductDetails />}/>

      </Routes>

    </div>
    </CartProvider>
    </AuthProvider>
  )
}

export default App