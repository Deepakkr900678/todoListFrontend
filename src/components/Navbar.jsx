import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const location = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ display: "flex" }}>
            <img src="./favicon-32x32.png" alt="" /> Todo List
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={` nav-link ${location.pathname === "/" ? "active" : ""}`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <>
                <Link to="/login">
                  <button className="btn btn-light mx-2">Login</button>
                </Link>
                <Link to="/signup">
                  <button className="btn btn-light ">Sign-Up</button>
                </Link>
              </>
            ) : (
              <button className="btn btn-light" onClick={handleLogout}>
                Log-Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
