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

export default function App() {
  return (
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
  )
}
