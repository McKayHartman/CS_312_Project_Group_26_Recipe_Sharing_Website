import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Recipes from './pages/Recipes'
import Login from './pages/Login'
import CreateAccount from './pages/CreateAccount'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


export function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create-account' element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App
