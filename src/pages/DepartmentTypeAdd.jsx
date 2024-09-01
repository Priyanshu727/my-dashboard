import { getDatabase, push, ref, set } from "firebase/database";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DepartmentTypeAdd() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Store user information including role in the database
      const db = getDatabase();

      const userRef = ref(db, `Departments`);

      const newDepartmentTypeRef = push(userRef);
      await set(newDepartmentTypeRef, {
        name: input.name,
      });

      return navigate("/AdminDeshbord/DepartmentTable");
    } catch (error) {
      console.error("Error DepartmentType:", error.code, error.message);
      alert("Invalid DepartmentType");
    }

    // const dbRef = ref(db, "users/");
    // await push(dbRef, input);
  };

  return (
    <>
      <h1 className="text-center text-4xl my-8 font-semibold text-white"> Leave Type Add</h1>
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
            Leave Type
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Your Name"
            required
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-800 text-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>

        <Link
          to="/AdminDeshbord/DepartmentTable"
          className="bg-gray-300 hover:bg-gray-800 text-black hover:text-white ms-5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Back
        </Link>
      </form>
    </>
  );
}
