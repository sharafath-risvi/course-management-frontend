import React from "react";
import { useNavigate } from "react-router-dom";
import "./signupSuccess.css";

const SignupSuccess = () => {

  let navigate = useNavigate();

  function handlelogin() {
    navigate("/login");
  }

  return (
    <div className="successContainer">

      <div className="successCard">

        <div className="successIcon">✓</div>

        <h1>Signup Successful</h1>

        <p>Your account has been created successfully.</p>

        <button onClick={handlelogin} className="loginBtn">
          Go to Login
        </button>

      </div>

    </div>
  );
};

export default SignupSuccess;