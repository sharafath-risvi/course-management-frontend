import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  let[name,setName]=useState("")
  let[email,setEmail]=useState("")
  let[password,setPassword]=useState("")
  let[confirmPass,setConfirmPass]=useState("")
  let[arr,setArr]=useState([])

  let navigate=useNavigate()

  function handleLogin(){
    navigate("/login")
  }


  
  // HANDLE SUBMIT FUNCTION
  function handleSubmit(e){
    e.preventDefault()
    
    let obj={
      name,email,password,confirmPass
    }

    if(name==""||email==""||password==""||confirmPass==""){
      alert("Please Enter All the fields")
      return
    }

    if(password!=confirmPass){
      alert("Password Should be same")
      return
    }

    fetch("http://localhost:8080/api/auth/signup",
     {
       method:"POST",
       headers:{
        "Content-Type":"application/json"
       },
       body:JSON.stringify(obj)
     })
     
     .then(response=>response.json())
     .then(data=>{
      console.log(data);
      alert("Signup Successfully")
      navigate("/login")
     })
     .catch(error=>{
      console.error(error);
      
     })
    setArr([...arr,obj])

    console.log(arr);

    navigate("/signupSuccess")

    setName("")
    setEmail("")
    setPassword("")
    setConfirmPass("")

  }





  return (

    <div className="signup-container">
      <div className="signup-card">

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>{
                setName(e.target.value)
            }}/>
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }}/>
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" value={confirmPass} onChange={(e)=>{
              setConfirmPass(e.target.value)
            }}/>
          </div>

          <button type="submit">Sign Up</button>

          <p className="loginText">
            Already have an account? <span onClick={handleLogin}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
