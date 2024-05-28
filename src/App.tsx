import { Route, Routes } from 'react-router-dom'
import './App.css'
import { useState } from 'react'
import API from './utils/API'
import Navbar from './components/Navbar'
import ProductDetailPage from './Pages/ProductDetailPage'
import Cart from './Pages/Cart'


export interface CartItem {
  id: number
}
function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  function addToCart(id: number) {
    const newItem = { id: id }
    const newCart = [...cart, newItem]
    setCart(newCart)
  }
  return (
    <>
      <Navbar cart={cart} />
      <Routes>
        <Route
          path='/'
          element={<API addToCart={addToCart}
          />
          }
        />
        <Route path='/product/:productId'
          element={<ProductDetailPage addToCart={addToCart} />}
        />
        <Route path='cart' element={<Cart cart={cart} />} />
      </Routes>
    </>
  )
}
export default App;