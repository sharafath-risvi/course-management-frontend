import React from 'react'
import Login from './pages/Login'
import Signup from './pages/Signup'
import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom";
import SignupSuccess from './pages/SignupSuccess';
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';
import EditCourse from "./pages/EditCourse";
import UserDashboard from "./pages/UserDashboard";

const App = () => {

  return (

    <BrowserRouter>
      
      <Routes>

          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Signup/>}/>
          <Route path="/signupSuccess" element={<SignupSuccess/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/addcourse" element={<AddCourse/>}/>
          <Route path="/editcourse/:id" element={<EditCourse />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App
