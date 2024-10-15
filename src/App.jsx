import {jwtDecode} from "jwt-decode"; // Correct import for jwt-decode (default export)
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header"; // Correct import for Header

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // New state to track if auth is still being checked
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const token = localStorage.getItem("token");
    setIsHomePage(window.location.pathname === "/");

    const checkAuthentication = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token expired
            if (isMounted) {
              localStorage.clear();
              setIsAuthenticated(false);
              setIsCheckingAuth(false); // Set loading to false once check is done
              navigate("/"); // Redirect to home
            }
          } else {
            // Token valid
            if (isMounted) {
              setIsAuthenticated(true);
              setIsCheckingAuth(false); // Auth check complete
            }
          }
        } catch (error) {
          console.error("Error decoding token:", error.message);
          if (isMounted) {
            localStorage.clear();
            setIsAuthenticated(false);
            setIsCheckingAuth(false); // Set loading to false once check is done
            navigate("/"); // Redirect to home
          }
        }
      } else {
        // No token found
        if (isMounted) {
          setIsAuthenticated(false);
          setIsCheckingAuth(false); // Set loading to false once check is done
          navigate("/"); // Redirect to home
        }
      }
    };

    checkAuthentication();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (isCheckingAuth) {
    // Show loading state while checking authentication
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid p-0">
      <Header /> {/* Correctly importing and rendering Header */}
      <div className="container p-0">
        {/* Allow access to the home page and add job page without authentication */}
        {isHomePage ? (
          <Outlet /> // Allow access to the home page without authentication
        ) : isAuthenticated || window.location.pathname === "/admin/addjobs" ? (
          <Outlet /> // Render nested routes if authenticated or on Add Job page
        ) : (
          <Navigate to="/" /> // Redirect to home if not authenticated and not on add job page
        )}
      </div>
    </div>
  );
}

export default App;
