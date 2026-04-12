import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Hero from './sections/Hero'
import Categories from './sections/Categories'
import FeaturedProducts from './sections/FeaturedProducts'
import About from './sections/About'
import Contact from './sections/Contact'
import Terms from './sections/Terms'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import './App.css'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <Cart />
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
  )
}
