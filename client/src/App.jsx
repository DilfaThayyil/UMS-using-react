import './index.css'
import React, { useEffect } from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import { useDispatch } from 'react-redux';
import { setUser,clearUser } from './Store/UserSlice';
import Profile from './pages/Profile';
import Home from './pages/Home';
import AdminHome from './Components/admin/AdminHome';
import AdminLogin from './Components/admin/AdminLogin';
import { ProtectedRoute, PublicRoute ,AdminPublicRoute,AdminProtectedRoute} from './Components/CustomRoutes';
import axios from 'axios';
const url = `http://localhost:3000`;

const App = () => {
  let user = localStorage.getItem('state');
  if (user) {
    user = JSON.parse(user);
  }
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
    if(user){
      checkingUpdate()
  }
  },[])

  async function checkingUpdate(){
    const response =await axios.post(`${url}/api/checkingUpdate`, { user })
    if(response.data.message){
      clearUser()
      localStorage.removeItem('token')
      navigate('/login')
    }
    if (response.data.user) {
      const {name,email,profileImage,_id}=response.data.user
        dispatch(setUser({ name: name, email: email,profileImage:profileImage,id:_id}))
    }
    }

  return(
    <Routes>
      <Route path="/login" element={<PublicRoute element={Login} />} />
      <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      <Route path="/" element={<ProtectedRoute element={Home} />} />
      <Route path="/admin" element={<AdminHome/>}/>
      <Route path='/adminLogin' element={<AdminPublicRoute element={AdminLogin}/>}/>
    </Routes>
);

}

export default App;
