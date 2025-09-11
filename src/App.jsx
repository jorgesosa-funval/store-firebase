import { BrowserRouter, Route, Routes } from 'react-router'
import AppLayout from './components/layout/app-layout' 
import { Home, Login, Profile, Admin, Register } from './pages'

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
