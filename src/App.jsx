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
import { useState } from 'react'

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
  // Maintenance mode disabled
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Cart />
          <AuthModal />
          <main>
            <Hero />
            <Categories />
            <FeaturedProducts />
            <About />
            <Contact />
            <Terms />
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}
