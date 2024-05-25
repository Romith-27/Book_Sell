import { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const { loggedIn,setLoggedIn } = useContext(UserContext)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/v1/auth/signin", {
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        setLoggedIn(true);
        console.log("Logged in", loggedIn)
        navigate("/home");
      }
    }).catch((err) => {
      console.log(err);
      setLoginMessage("Invalid Credentials");
    });
  };
  const handleAdminClick = (e) => {
    e.preventDefault();
    navigate("/admin");
  }
  const handleNewUserClick = (e) => {
    e.preventDefault();
    navigate("/signup");
  }


  return (
    <>
      <div className="login_background">
        <form
          onSubmit={handleSubmit}
          className="login_form"
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            textAlign: "center",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <div>
            <h1
              style={{ color: "#333", marginBottom: "20px", fontSize: "24px", fontWeight: "bold" }}
            >
              Library Management System
            </h1>
          </div>
          <label
            htmlFor="Email"
            style={{ display: "block", margin: "10px 0", fontSize: "16px" }}
          >
            Email
          </label>
          <input
            type="text"
            name="Email"
            placeholder="Enter your Email"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label
            htmlFor="password"
            style={{ display: "block", margin: "10px 0", fontSize: "16px" }}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <p style={{ color: "red", margin: "10px 0" }}> {loginMessage}</p>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 20px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
              margin: "10px 0",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Log in
          </button><br />
          <a style={{ color: "blue", marginRight: "15px", cursor: "pointer" }} onClick={handleAdminClick}>Are you an admin?</a>
          <a style={{ color: "blue", cursor: "pointer" }} onClick={handleNewUserClick}>New User? Signup.</a>
        </form>
      </div>
    </>
  );
};

export default Login;
