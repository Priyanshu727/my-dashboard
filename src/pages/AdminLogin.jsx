import React, { useState } from "react";
import { child, get, getDatabase, ref } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../firebase/firebase";
// import firebase from "firebase/app";

import { Link, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  // const dataBase = getDatabase(app);
  const auth = getAuth(app);
  // console.log(dataBase);
  const navigate = useNavigate();

  // State variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUserRole = async (userId) => {
    const db = getDatabase(); // Get a reference to your Firebase database

    try {
      const snapshot = await get(child(ref(db), `admin/${userId}/role`)); // Assuming user roles are stored under 'users' node with the userId as key
      // console.log(snapshot._node.value_);

      if (snapshot.exists()) {
        console.log(snapshot.val());

        return snapshot.val(); // Return the user's role if it exists
      } else {
        console.error("User role not found");
        return null; // Return null if user role is not found
      }
    } catch (error) {
      console.error("Error retrieving user role:", error.message);
      return null; // Return null if an error occurs
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully!");

      // After successful login, retrieve user's role
      const user = auth.currentUser;
      const userRole = await getUserRole(user.uid);

      if (userRole === "admin") {
        // Navigate to admin dashboard if user is admin
        navigate("/AdminDeshbord");
      } else {
        // Redirect to appropriate page or display error message
        console.error("User is not an admin");
        navigate("/EmployeeDeshbord");
      }
    } catch (error) {
      console.error("Error logging in:", error.code, error.message);
    }
  };

  return (
    <>
      <div className="bg-[#009487] h-96 relative">
        <h1 className="text-center text-[3rem] text-white p-14">Employee Managment System</h1>

        <div className="flex flex-col justify-center items-center mx-auto p-10 shadow-2xl w-1/4 absolute bg-white inset-x-0 rounded-md">
          <h2 className="text-2xl mb-4 ms-[-20px] font-semibold"><i class="ri-user-fill"></i> Login</h2>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <input
              className="border py-1 px-3 w-full mb-4 outline-[#009487]"
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br /> <br />
            <input
              className="border py-1 px-3 w-full mb-4 outline-[#009487]"
              name="password"
              type="password"
              placeholder="Enter Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /><br />
            <Link to={"/"} className="text-[#008075]">Forgot Password ?</Link>
            <br /><br />
            <button className="border py-1 px-3 bg-[#008075] text-white w-full mb-4" type="submit">
              Login
            </button>
            <br />
            <Link to={"/AdminRegister"} className="text-[#008075]">If Do Not Have Account</Link>
          </form>
        </div>
      </div>
    </>
  );
}
