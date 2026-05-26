import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import Login from '../src/pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from '../src/pages/Home'
import Signup from '../src/pages/Signup'
import 'react-toastify/ReactToastify.css'
import RefreshHandler from './helpers/RefreshHandler'

function App() {

  
   const [isAuthRoute, setauthRoute] = useState<boolean>(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     setauthRoute(true);
  //   }
  // }, []);
  
  const PrivateRoute = ({ element }: any) => {
    return isAuthRoute ? element : <Navigate to="/login" replace />
  }

  return (
    <>
      <div className='App'>

        <RefreshHandler setauthRoute={setauthRoute} />
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace/>}></Route>
          <Route path='/home' element={<PrivateRoute element={<Home />} />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>

        </Routes>
      </div>
    </>
  )
}

export default App
