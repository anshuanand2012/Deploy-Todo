// Signin.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Signin.css"; // Import the CSS file
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux"; // yea basilly function call krne ke liye hota hai example isloggedIn index.js mai true hota hai dekh lo
import { authActions } from "../../store"; //yea or uper wala ek hai react-redux dek lo


const Signin = () => {
  const dispatch=useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1000/api/v1/login", {
        email,
        password,
      });

      if (response.status === 200) {
       
        // alert("Logged in successfully!");
        // console.log("User ID:", response.data.user._id);
        sessionStorage.setItem("id",response.data.user._id);
   dispatch(authActions.login());

        navigate("/todo"); // Redirect to "/todo" after successful login
      }
    }
     catch (error) {
      if (error.response && error.response.status === 400) {
        console.log("Error:", error.response.data);
        alert(error.response.data.msg);
      } else {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="container2">
        
        <form onSubmit={handleSubmit}>
          <h2><b>Sign In</b></h2>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </label>
          <br />
          <button type="submit" className="button">
            Sign In
          </button>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Signin;
