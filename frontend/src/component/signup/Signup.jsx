import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the CSS file
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/register",
        {
          email,
          username,
          password,
        }
      );

      if (response.data.msg === "User registered successfully") {
        console.log("Response:", response.data);
        alert(response.data.msg);
        // Clear the form
        setEmail("");
        setUsername("");
        setPassword("");

        navigate("/signin");
      } else if (response.data.msg === "Email address already taken") {
        console.log("Response:", response.data);
        alert(response.data.msg); // Display message for existing user
      }
    } catch (error) {
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
        <h2>Sign Up</h2>
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
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit" className="button2">
            Sign Up
          </button>
          <p className="mt-3">
            Already have an account? <a href="/signin">Login</a>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Signup;
