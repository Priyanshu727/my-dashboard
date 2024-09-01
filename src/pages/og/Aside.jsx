import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
const auth = getAuth();

function Aside() {
  const navigator = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigator("/");
      })
      .catch((error) => {
        console.error("Sign-out error:", error);
      });
  };
  return (
    <>
      <div className="aside">
        <div className="AsideMenu">
          <ul className="AsideList">
            <li className="list text-xl font-bold ml-[60px] p-[20px]">
              <i className="ri-dashboard-3-line mr-[20px]"></i>
              Dashboard
            </li>
            <li className="relative ml-[60px]">
              <i className="ri-building-4-line mr-[20px]"></i>Department <i className="ri-arrow-drop-right-line absolute right-[10%]"></i>
              <ul>
                <li>Add Department </li>
                <li> Manage Department</li>
              </ul>
            </li>

            <li className="relative ml-[60px]">
              <i className="ri-macbook-line mr-[20px]"></i>Leave Type <i className="ri-arrow-drop-right-line absolute right-[10%]"></i>
              <ul>
                <li>Add Leave </li>
                <li> Manage Leave</li>
              </ul>
            </li>

            <li className="relative ml-[60px]">
              <i className="ri-user-fill mr-[20px]"></i>Employee <i className="ri-arrow-drop-right-line absolute right-[10%]"></i>
              <ul>
                <li>
                  <Link to={"/AdminDeshbord/EmployeeRegister"}>Add Employee</Link>
                </li>
                <li>
                  <Link to={"/AdminDeshbord/EmployeeList"}>Manage Employee</Link>
                </li>
              </ul>
            </li>

            <li className="relative ml-[60px]">
              <i className="ri-money-dollar-box-line mr-[20px]"></i>Salary<i className="ri-arrow-drop-right-line absolute right-[10%]"></i>
              <ul>
                <li>Add Salary </li>
                <li> Manage Salary</li>
              </ul>
            </li>

            <li className="relative ml-[60px]">
              <i className="ri-file-copy-line mr-[20px]"></i>Leave Requests<i className="ri-arrow-drop-right-line absolute right-[10%]"></i>
              <ul>
                <li>Add Leave </li>
                <li> Manage Leave</li>
              </ul>
            </li>

            <li className="relative ml-[60px]">
              <i className="ri-list-check mr-[20px]"></i>Report<i className="ri-arrow-drop-right-line absolute right-[10%]"></i>
              <ul>
                <li>Add Report </li>
                <li> Manage Report</li>
              </ul>
            </li>

            <li>
              <button className="border py-2 px-3 rounded-4 shadow-lg" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Aside;
