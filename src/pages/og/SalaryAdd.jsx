import { getDatabase, onValue, push, ref, set, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import app from "../firebase/firebase";

export default function SalaryAdd() {
  const navigate = useNavigate();
  const dataBase = getDatabase(app);
  // const [departments, setDepartments] = useState([]);
  const [employeeNames, setEmployeeName] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [salary, setSalary] = useState(0);
  const [allowanceSalary, setAllowanceSalary] = useState(0);
  const [Total, setTotal] = useState(0);
  const [input, setInput] = useState({
    Salary: "",
    AllowanceSalary: "",
    Total: "",
  });
  // console.log(selectedEmployeeId);

  // useEffect(() => {
  //   const dbRef = ref(dataBase, "Departments/");
  //   onValue(dbRef, (snapshot) => {
  //     const data = snapshot.val();
  //     if (data) {
  //       const departmentNames = Object.values(data).map((department) => department.name);
  //       setDepartments(departmentNames);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const dbRef = ref(dataBase, "Employee/");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const employeeNames = Object.values(data).map((employeeName) => employeeName.name);
        // console.log(employeeNames);
        setEmployeeName(employeeNames);
      }
    });
  }, []);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });

    if (e.target.id === "Salary" || e.target.id === "AllowanceSalary") {
      const newSalary = e.target.id === "Salary" ? parseFloat(e.target.value) : salary;
      const newAllowanceSalary = e.target.id === "AllowanceSalary" ? parseFloat(e.target.value) : allowanceSalary;

      setSalary(newSalary);
      setAllowanceSalary(newAllowanceSalary);

      const newTotal = newSalary + newAllowanceSalary;
      setTotal(newTotal);
    }

    if (e.target.id === "employeeNames") {
      const selectedEmployee = employeeNames.find((employee) => employee === e.target.value);

      const dataBase = getDatabase(app);
      const dbRef = ref(dataBase, "Employee/");
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        if (selectedEmployee) {
          const temp = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          temp.map((user) => {
            if (user.name === selectedEmployee) setSelectedEmployeeId(user.id);
          });
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const db = getDatabase();
      const userRef = ref(db, `Employee/${selectedEmployeeId}`);

      const salary = parseFloat(input.Salary) || 0;
      const allowanceSalary = parseFloat(input.AllowanceSalary) || 0;
      const total = salary + allowanceSalary;

      await update(userRef, {
        Salary: salary,
        AllowanceSalary: allowanceSalary,
        Total: total,
      });

      return navigate("/SalaryTable");
    } catch (error) {
      console.error("Error SalaryAdd:", error.code, error.message);
      alert("Invalid SalaryAdd");
    }
  };

  return (
    <>
      <h1 className="text-center text-4xl my-8 font-semibold text-white"> Add Salary</h1>

      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        {/* <div className="mb-5">
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
        </div> */}

        <div className="mb-5">
          <select
            name="employeeNames"
            id="employeeNames"
            onChange={handleChange}
            className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
          >
            <option disabled selected value="">
              Select employeeNames
            </option>
            {employeeNames.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="Salary" className="block mb-2 text-sm font-medium text-white">
            Salary
          </label>
          <input
            type="number"
            id="Salary"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Employee's Salary"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="AllowanceSalary" className="block mb-2 text-sm font-medium text-white">
            Allowance Salary
          </label>
          <input
            type="number"
            id="AllowanceSalary"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Employee's AllowanceSalary"
            required
            onChange={handleChange}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="Total" className="block mb-2 text-sm font-medium text-white">
            Total
          </label>
          <input
            type="text"
            id="Total"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter Your Name"
            required
            disabled
            onChange={handleChange}
            value={Total || 0}
          />
        </div>

        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-800 text-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
}
