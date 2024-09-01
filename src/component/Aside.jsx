import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
const auth = getAuth();

const AsideItem = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className={`relative ml-[30px] p-[10px] ${isOpen ? "active" : ""}`}>
      <button className="flex items-center w-full" onClick={handleClick}>
        {isOpen && <i className={`${icon} text-[#009487]`}></i>}
        {!isOpen && <i className={icon}></i>}
        {title}
        {isOpen && <i className="ri-arrow-drop-down-line absolute right-[10%]"></i>}
        {!isOpen && <i className="ri-arrow-drop-right-line absolute right-[10%]"></i>}
      </button>
      {isOpen && <ul className="mt-1 ml-[40px] leading-8">{children}</ul>}
    </li>
  );
};

const Aside = () => {
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

  const asideMenuItems = [
    {
      title: "Department",
      icon: "ri-building-4-line mr-[20px]",
      link: "/",
      children: [
        { title: "Add Department", link: "/AdminDeshbord/DepartmentTypeAdd" },
        { title: "Manage Department", link: "/AdminDeshbord/DepartmentTable" },
      ],
    },
    {
      title: "Leave Type",
      icon: "ri-macbook-line mr-[20px]",
      link: "/",
      children: [
        { title: "Add Leave", link: "/AdminDeshbord/LeaveTypeAdd" },
        { title: "Manage Leave", link: "/AdminDeshbord/LeaveTable" },
      ],
    },
    {
      title: "Employee",
      icon: "ri-user-fill mr-[20px]",
      link: "/EmployeeList",
      children: [
        { title: "Add Employee", link: "/AdminDeshbord/EmployeeRegister" },
        { title: "Manage Employee", link: "/AdminDeshbord/EmployeeList" },
      ],
    },
    {
      title: "Salary",
      icon: "ri-money-dollar-box-line mr-[20px]",
      link: "/",
      children: [
        { title: "Add Salary", link: "/AdminDeshbord/SalaryAdd" },
        { title: "Manage Salary", link: "/AdminDeshbord/SalaryTable" },
      ],
    },
    {
      title: "Leave Requests",
      icon: "ri-file-copy-line mr-[20px]",
      link: "/",
      children: [
        { title: "Add Leave", link: "" },
        { title: "Manage Leave", link: "" },
      ],
    },
    {
      title: "Report",
      icon: "ri-list-check mr-[20px]",
      link: "/",
      children: [
        { title: "Add Report", link: "" },
        { title: "Manage Report", link: "" },
      ],
    },
  ];

  return (
    <>
      <div className="aside">
        <div className="AsideMenu">
          <ul className="AsideList mt-6">
            <li className="relative ml-[28px] p-[10px] list text-xl font-bold db_title">
              <Link to={"/AdminDeshbord"}>
                <i className="ri-dashboard-3-line mr-[20px]"></i>
                Dashboard
              </Link>
            </li>
            {asideMenuItems.map((item) => (
              <AsideItem key={item.title} title={item.title} icon={item.icon}>
                {item.children && (
                  <ul className="mt-1 ml-[20px] leading-8">
                    {item.children.map((child) => (
                      <li className="hover:text-[#bcbcbc]" key={child.title}>
                        {item.link && <Link to={child.link}>{child.title}</Link>}
                      </li>
                    ))}
                  </ul>
                )}
              </AsideItem>
            ))}
            <li>
              <button
                className="bg-[#009487] hover:bg-[#007269] text-white font-bold py-2 px-28 rounded shadow-lg ml-[35px] mt-[60px] mb-[10px]"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Aside;
