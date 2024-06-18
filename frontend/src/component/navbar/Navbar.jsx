import React from "react";
import "./Navbar.css";
import { RiBookFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const logout = () => {
    sessionStorage.clear("id");
    navigate("/");
    dispatch(authActions.logout());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <b>
            <RiBookFill /> To Do{" "}
          </b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <div className="d-flex"><li className="nav-item mx-2">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li></div>
            <div className="d-flex">
            <li className="nav-item mx-2">
              <Link className="nav-link active" to="/about">
                About Us
              </Link>
              
            </li>
            </div>
            <div className="d-flex">
            <li className="nav-item mx-2">
              <Link className="nav-link active" to="/todo">
                Todo
              </Link>
            </li>
            </div>
            {!isLoggedIn && (
              <>
                <div className="d-flex my-lg-0 my-1">
                  <li className="nav-item mx-2">
                    <Link className="nav-link active btn-nav  p-2" to="/signup">
                      SignUp
                    </Link>
                  </li>
                </div>
                <div className="d-flex my-lg-0 my-1 ">
                  <li className="nav-item mx-2">
                    <Link className="nav-link active btn-nav  p-2" to="/signin">
                      SignIn
                    </Link>
                  </li>
                </div>
              </>
            )}
            {isLoggedIn && (
              <div className="d-flex my-lg-0 my-1">
                <li className="nav-item mx-2">
                  <Link
                    className="nav-link active btn-nav  p-2"
                    to="/"
                    onClick={logout}
                  >
                    LogOut
                  </Link>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
