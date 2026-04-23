import React from "react";
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import AuthModal from './components/AuthModal'
import Hero from './sections/Hero'
import Categories from './sections/Categories'
import FeaturedProducts from './sections/FeaturedProducts'
import About from './sections/About'
import Contact from './sections/Contact'
import Terms from './sections/Terms'

import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import './App.css'
import { useState, useEffect } from 'react'

const CONFIRM_URL = 'https://europe-west1-maliasport.cloudfunctions.net/confirmOrder'

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null)
  if (error) {
    return <div style={{ color: 'red', background: '#111', padding: 32, fontSize: 18 }}>Villa í appi: {error.message || error.toString()}</div>
  }
  return (
    <ErrorCatcher setError={setError}>{children}</ErrorCatcher>
  )
}

class ErrorCatcher extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    this.props.setError(error)
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}


const isClosed = false

export default function App() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('payment') === 'success') {
      const orderId = params.get('order')
      if (orderId) {
        fetch(CONFIRM_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId }),
        }).catch(console.error)
      }
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  return (
    <AuthProvider>
      <CartProvider>
        <ErrorBoundary>
          <Navbar />
          <Cart />
          <AuthModal />
          <Hero />
          <Categories />
          <FeaturedProducts />
          <About />
          <Contact />
          <Terms />
          <Footer />
        </ErrorBoundary>
      </CartProvider>
    </AuthProvider>
  )
}
