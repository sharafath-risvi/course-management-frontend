import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

let Login = () => {

  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let navigate = useNavigate()

  function handleSignup(){
    navigate("/")   // better route
  }

  function handleLogin(e){
    e.preventDefault()

    if(email=="" || password==""){
      alert("Please enter all the fields")
      return
    }

    fetch("http://localhost:8080/api/auth/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);

      if(data && data.role){
        if(data.role === "ADMIN"){
          alert("Admin Login")
          navigate("/dashboard")
        }else{
          alert("User Login")
          navigate("/user-dashboard")
        }
      }else{
        alert("Invalid Email or Password")
      }
    })
    .catch(err=>{
      alert("Login Failed")
      console.log(err);
    })
  }

  // ✅ RETURN MUST BE HERE (OUTSIDE FUNCTION)

  return (
    <main className="mainContainer">
      <div className="loginCard">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleLogin}>
          <div className="inputGroup">
            <label>Email</label>
            <input 
              type="text" 
              placeholder="Enter your Email" 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="inputGroup">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <button className="loginBtn">Login</button>

          <p className="signupText">
            Don't have an account? 
            <span onClick={handleSignup}> Sign up</span>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;