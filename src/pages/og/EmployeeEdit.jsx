import { getDatabase, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import app from "../firebase/firebase";

export default function EmployeeEdit() {
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dataBase = getDatabase(app);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbRef = ref(dataBase, `Employee/${id}`);
    await update(dbRef, input);
    navigate("/EmployeeList");
  };

  useEffect(() => {
    if (id) {
      const dbRef = ref(dataBase, `Employee/${id}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        setInput(data);
        console.log(data);
      });
    } else {
      navigate("/EmployeeList");
    }
  }, []);

  return (
    <div>
      <h1 className="text-center text-4xl my-8 font-semibold text-blue-600"> Edit</h1>
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
            value={input.name || ""}
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
            value={input.email || ""}
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={input.password || ""}
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
          to="/EmployeeList"
          className="ms-5 bg-gray-300 hover:bg-gray-800 text-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Back
        </Link>
      </form>
    </div>
  );
}
