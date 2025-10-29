import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home'
import Login from './pages/login' 
import Profile from './pages/profile' 
import AppLayout from './components/layout/app-layout'
import Admin from './pages/admin'
import Register from './pages/register' 
import { app } from './libs/firebase'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<AppLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
