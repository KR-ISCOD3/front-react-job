import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const getToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure token exists before decoding
    if (getToken) {
      setUserLoggedIn(true);
      try {
        const decodedToken = jwtDecode(getToken); // Correct function name
        console.log(decodedToken);
        // Check if token is expired
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decodedToken.exp < currentTime) {
          // Token has expired
          localStorage.clear(); // Clear token from local storage
          setUserLoggedIn(false);
          setRole(""); // Clear role
          setName(""); // Clear name
          navigate("/"); // Redirect to login
        } else {
          // Token is valid
          setUserLoggedIn(true);
          setName(decodedToken.username);
          setRole(decodedToken.role);
        }
      } catch (error) {
        console.error("Error decoding token:", error.message);
      }
    } else {
      setUserLoggedIn(false); // No token means not logged in
    }
  }, [getToken]);

  const handleLogout = () => {
    localStorage.clear();

    setUserLoggedIn(false);
    setRole(null);

    navigate("/");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary shadow fredoka-font">
        <div className="container">
          <a className="navbar-brand me-2">3M.</a>

          <button
            className="navbar-toggler btn border-0 shadow-none"
            type="button"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse ">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Dashboard
                </a>
              </li>
              {role === "admin" && (
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/admin/addjobs"}>
                    Add Job
                  </NavLink>
                </li>
              )}
            </ul>

            {userLoggedIn ? (
              <>
                <span className="text-dark">Welcome, {name}</span>
                <button className="btn btn-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn nav-link px-3 me-2">
                  Login
                </NavLink>
                <NavLink to="/register" className="btn btn-success me-3">
                  Register for free
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
