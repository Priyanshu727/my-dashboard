import React, { useState } from "react";
import app from "../firebase/firebase";
import { getDatabase, push, ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function AdminRegister() {
  // const db = getDatabase(app);
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
        const userRef = ref(db, `Employee/${user.uid}`);

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
      <div className="bg-[#009487] h-96 relative">
        <h1 className="text-center text-[3rem] text-white p-14">Add User</h1>
        <div className="shadow-2xl w-1/4 mx-auto p-10 absolute inset-x-0 bg-white ">
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="name"
                id="name"
                className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Your Name"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <input
                type="email"
                id="email"
                className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Your Email Address"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                id="password"
                placeholder="Enter Your Email Password"
                className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm Your Password"
                className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <select
                id="role"
                className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
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
              className="bg-[#009487] hover:bg-[#007269] text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>

            <Link
              to="/"
              className="bg-[#009487] hover:bg-[#007269] text-white ms-5 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
