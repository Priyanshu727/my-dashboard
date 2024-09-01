import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

export default function EmployeeRegister() {
  const dataBase = getDatabase(app);
  const [departments, setDepartments] = useState([]);
  // console.log(departments);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Employee",
  });

  useEffect(() => {
    const dbRef = ref(dataBase, "Departments/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const departmentNames = Object.values(data).map((department) => department.name);
        setDepartments(departmentNames);
      }
    });
  }, []);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.password !== input.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const dbRef = ref(dataBase, "Employee/");
    await push(dbRef, input);
    navigate("/EmployeeList");
  };

  return (
    <>
      <div className="bg-[#009487] h-96 relative">
        <h1 className="text-center text-[3rem] text-white p-14"> Add Employee</h1>
        <div className="shadow-2xl w-1/4 mx-auto p-10 absolute inset-x-0 bg-white ">
          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            <div className="mb-5">
              <input
                type="number"
                id="EmployeeId"
                className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Enter Employee Id"
                required
                onChange={handleChange}
              />
            </div>
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
                placeholder="Enter Your Password"
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
                className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                required
                onChange={handleChange}
              />
            </div>

            <div className="mb-5">
              <select
                name="departments"
                id="departments"
                onChange={handleChange}
                className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
              >
                <option disabled selected value="">
                  Select Department
                </option>
                {departments.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="bg-[#009487] hover:bg-[#007269] text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>

            <Link
              to="/Admin"
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
