import React, { useState } from "react";
import app from "../firebase/firebase";
import { getDatabase, push, ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function AdminRegister() {
  const auth = getAuth();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (input.password !== input.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, input.email, input.password);
      const user = userCredential.user;

      // Store user information including role in the database
      const db = getDatabase();
      if (input.role == "admin") {
        const userRef = ref(db, `admin/${user.uid}`);

        await set(userRef, {
          name: input.name,
          email: input.email,
          password: input.password,
          role: input.role,
        });
      } else {
        const userRef = ref(db, `employee/${user.uid}`);

        await set(userRef, {
          name: input.name,
          email: input.email,
          password: input.password,
          role: input.role,
        });
        return navigate("/AdminDeshbord");
      }

      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error.code, error.message);
      alert("Invalid Entry");
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl my-8 font-semibold text-white"> Add</h1>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
            Your name
          </label>
          <input
            type="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Your Name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Your Email Address"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your Email Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-white">
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Your Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-white">
            Your role
          </label>
          <select
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-800 text-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>

        <Link
          to="/"
          className="bg-gray-300 hover:bg-gray-800 text-black hover:text-white ms-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Back
        </Link>
      </form>
    </>
  );
}
