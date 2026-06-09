import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Order from './pages/Order'
import Byob from './pages/Byob'
import FindUs from './pages/FindUs'
import About from './pages/About'
import './styles/globals.css'

export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/order" element={<Order />} />
        <Route path="/byob" element={<Byob />} />
        <Route path="/find-us" element={<FindUs />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </HashRouter>
  )
}
