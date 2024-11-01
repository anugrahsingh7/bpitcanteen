import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import AppLayout from './ui/AppLayout'
import './App.css'
import Breakfast from './pages/Breakfast'
import Lunch from './pages/Lunch'
import Dinner from './pages/Dinner'
import Snacks from './pages/Snacks'
import Beverages from './pages/Beverages'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Toaster />
       <Routes>

       <Route index path='/' element={<Login/>}/>
       
        <Route  element={<AppLayout/>}> 
        {/* <Route index path='/' element={<Navigate replace to="snacks"/>}/> */}
        <Route index path='/snacks' element={<Snacks/>}/>
          <Route path='/breakfast' element={<Breakfast/>}/>
          <Route path='/lunch' element={<Lunch/>}/>
          <Route path='/dinner' element={<Dinner/>}/>
         <Route path='/beverages' element={<Beverages/>}/>
          
        </Route>
       
        <Route path='/cart' element={<Cart/>}/>

</Routes>

    </BrowserRouter>
  )
}

export default App
