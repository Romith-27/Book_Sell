import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfpassword] = useState("");
  const [Error, setError] = useState("");
  const [accountType, setAccountType] = useState("User")
  let navigate = useNavigate();

  function handleSubmit(e) {
    console.log("inside handle submit");
    e.preventDefault();
    if (password !== cnfpassword) {
      console.log("error running")
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be atleast 8 characters long");
      return;
    }

    //posting the details to the backend
    console.log("posting")
    console.log("This is the formData", firstName, lastName, email, password, cnfpassword, accountType)
    axios.post("http://localhost:5000/api/v1/auth/signup", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      confirmPassword: cnfpassword,
      accountType: accountType
    }).then((res) => {
      console.log("res",res);
      setError(res.message)
      if (res.status === 200) {
        navigate("/");
      }
    }).catch((err) => {
      console.log(err);
      if (err.response.status === 400) {
        setError("Username already exists");
      }
    });
  }

  return (
    <>
      <div className="signup_container">
        <form
          className="signup_form"
          onSubmit={handleSubmit}
          style={{
            maxWidth: "400px",
            margin: "0 auto",
            textAlign: "center",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h1 style={{ color: "#333", marginBottom: "10px", fontSize: "24px", fontWeight: "bold " }}>
            Library Management System
          </h1>
          <label
            htmlFor="name"
            style={{ display: "block", margin: "5px 0", fontSize: "16px" }}

          >
            First Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <label
            htmlFor="name"
            style={{ display: "block", margin: "5px 0", fontSize: "16px" }}

          >
            Last Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />

          <label
            htmlFor="email"
            style={{ display: "block", margin: "5px 0", fontSize: "16px" }}

          >
            E-mail
          </label>
          <input
            type="text"
            name="email"
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <label htmlFor="accountType" style={{ display: "block", margin: "10px 0", fontSize: "16px" }}>
            Are you an Admin?
          </label>
          <div className="flex justify-evenly">
            <div className="flex items-center">
              <input
                type="radio"
                name="accountType"
                value="Admin"
                checked={accountType === "Admin"}
                onChange={() => setAccountType("Admin")}
              />
              <span style={{ marginRight: "2px" }}>
                Admin
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="accountType"
                value="User"
                checked={accountType === "User"}
                onChange={() => setAccountType("User")}
              />
              <span>
                User
              </span>
            </div>
          </div>
          <label
            style={{ display: "block", margin: "10px 0", fontSize: "16px" }}
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <label
            style={{ display: "block", margin: "10px 0", fontSize: "16px" }}
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            defaultValue={cnfpassword}
            onChange={(e) => setCnfpassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <p style={{ color: "red", margin: "10px" }}>{Error}</p>
          <button
            type="submit"
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "12px 10px",
              fontSize: "16px",
              borderRadius: "4px",
              cursor: "pointer",
              border: "none",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
