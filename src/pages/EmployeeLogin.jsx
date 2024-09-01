import React, { useState } from "react";
import { getDatabase, push, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase";
// import firebase from "firebase/app";

import { Link, useNavigate } from "react-router-dom";

export default function EmployeeLogin() {
  // const dataBase = getDatabase(app);
  const auth = getAuth(app);
  // console.log(dataBase);

  const navigate = useNavigate();

  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");
      // Navigate to another page if login is successful
      navigate("/EmployeeDeshbord");
    } catch (error) {
      console.error("Error logging in:", error.code, error.message);
    }
  };

  return (
    <>
      <div className="w-1/2 flex flex-col justify-center items-center">
        <h2>Employee Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="border py-1 px-3"
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br /> <br />
          <input
            className="border py-1 px-3"
            name="password"
            type="password"
            placeholder="Enter Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br /> <br />
          <button className="border py-1 px-3" type="submit">
            Login
          </button>
          <br /> <br />
          <Link to={"/EmployeeRegister"}>If Do Not Have Account</Link>
        </form>
      </div>
    </>
  );
}
