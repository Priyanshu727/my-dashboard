import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";
import { getDatabase, onValue, push, ref } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

export default function EmployeeRegister() {
  const dataBase = getDatabase(app);
  const [departments, setDepartments] = useState([]);
  const [StateName, setStateName] = useState([]);
  const [CiteName, setCiteName] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const cityData = {
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Navsari"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane"],
    Rajasthan: ["Jaipur", "Udaipur", "Bikaner", "Pali"],
  };
  const [input, setInput] = useState({
    EmployeeId: "",
    first_name: "",
    last_name: "",
    departments: "",
    email: "",
    mobile_number: "",
    country: "",
    state: "",
    city: "",
    dob: "",
    doj: "",
    photo: "",
    address: "",
    pwd: "",
    confirm_pwd: "",
    role: "Employee",
  });

  // console.log(input);

  const stateList = Object.keys(cityData);

  useEffect(() => {
    setCiteName(cityData[input.state] || []);
  }, [input.state]);

  useEffect(() => {
    setCiteName(cityData[StateName] || []);
    setInput((prevInput) => ({ ...prevInput, state: StateName }));
  }, [StateName]);

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
    navigate("/AdminDeshbord/EmployeeList");
  };

  const handleStateChange = (e) => {
    setStateName(e.target.value);
    setIsSelected(e.target.value === "" ? false : true);
  };

  return (
    <>
      <div className="h-full">
        <div className="bg-[#009487] h-96 relative">
          <h1 className="text-center text-[3rem] text-white p-14"> Add Employee</h1>
          <div className="shadow-2xl w-4/5 mx-auto p-10 absolute inset-x-0 bg-white ">
            <form className="mx-auto" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                  Employee ID
                </label>
                <input
                  type="number"
                  id="EmployeeId"
                  className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  placeholder="Enter Employee Id"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5 flex">
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Your First Name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Your First Name"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-5 flex">
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Department
                  </label>
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
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Email ID
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Your Email Address"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-5 flex">
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Mobile Number
                  </label>
                  <input
                    type="phone"
                    id="mobile_number"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Your First Name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Country Name
                  </label>
                  <select
                    name="country"
                    id="country"
                    onChange={handleChange}
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                  >
                    <option disabled selected value="">
                      Select Country Name
                    </option>

                    <option value="india">India</option>
                  </select>
                </div>
              </div>
              <div className="mb-5 flex">
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    State Name
                  </label>
                  <select
                    name="state"
                    id="state"
                    value={input.state || ""}
                    onChange={handleStateChange}
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                  >
                    <option disabled selected value="">
                      Select State Name
                    </option>
                    {stateList.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    City Name
                  </label>
                  <select
                    name="city"
                    id="city"
                    value={input.city || ""}
                    onChange={handleChange}
                    disabled={!isSelected}
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg  block w-full p-2.5"
                  >
                    <option disabled selected value="">
                      Select City Name
                    </option>
                    {CiteName.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-5 flex">
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    DOB
                  </label>
                  <input
                    type="date"
                    id="dob"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Your First Name"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Date of Join
                  </label>
                  <input
                    type="date"
                    id="doj"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Your First Name"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-5 flex">
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Photo
                  </label>
                  <input
                    type="file"
                    id="photo"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Your First Name"
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Address
                  </label>
                  <textarea
                    type="date"
                    id="address"
                    Rows="3"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Your Address"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mb-5 flex">
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Password
                  </label>
                  <input
                    type="password"
                    id="pwd"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Password"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full me-5">
                  <label className="inline-block mb-1 ps-1 text-gray-700" htmlFor="">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm_pwd"
                    Rows="3"
                    className="bg-gray-50 border outline-[#009487] text-gray-900 text-sm rounded-lg block w-full p-2.5"
                    placeholder="Enter Confirm Password"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#009487] hover:bg-[#007269] text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Submit
              </button>

              <Link
                to="/AdminDeshbord/EmployeeList"
                className="bg-[#009487] hover:bg-[#007269] text-white ms-5 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
