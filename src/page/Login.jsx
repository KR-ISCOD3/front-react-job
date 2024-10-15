import { NavLink, useNavigate } from "react-router-dom";
import "../sass/login.scss";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [nameOremail,setNameOremail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
       const res = await axios.post("https://express-mongo-8bam.onrender.com/auth/login",{
        nameOremail: nameOremail,
        password: password,
       });

      // Assuming the token is in response.data.token
       const {token,isExpired,role} = res.data;

      // Store the user data and token in localStorage
       localStorage.setItem("token",token);
       localStorage.setItem("isExpired",isExpired);
       localStorage.setItem("role",role);

      // Navigate to a different route after successful login
       navigate("/");
    }catch(e){
      setError("Invalid some feild.Please check your credentials.");
      console.log("Login error: ",e);
      setNameOremail("");
      setPassword("");
    }
  }



  return (
    <div className="container-fluid p-0 middle-content">
      <div className="login-form p-4 p-md-5 shadow rounded-4" >
        <h2 className="fredoka-font mb-2 border-start ps-2 border-3">Sign In</h2>
        <form onSubmit={handleLogin} >
          { error && <span className="text-danger fredoka-font my-1">{error}</span> }
          <input
            type="text"
            name="nameOremail"
            value={nameOremail}
            onChange={(e) => setNameOremail(e.target.value)}
            className="form-control my-3 rounded-5 shadow-none fredoka-font"
            placeholder="Username Or Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="form-control my-3 rounded-5 shadow-none fredoka-font"
            placeholder="Password"
          />
          <div className="fredoka-font">
            <span className="">Do not have account ? </span>
            <NavLink to="/register" className="text-dark ">
              Register
            </NavLink>
          </div>
          <button className="btn bg-info text-light rounded-5 px-3 mt-3 float-end fredoka-font">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
