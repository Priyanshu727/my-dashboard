import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useHistory for programmatic navigation
import EmployeeCount from "./EmployeeCount";
import LeaveTypeCount from "./LeaveTypeCount";
import DepartmentTypeCount from "./DepartmentTypeCount";
import Header from "../component/Header";
import Aside from "../component/Aside";
import Main_Data from "../component/Main_Data";

// import EmployeeRegister from "./EmployeeRegister.jsx";

const auth = getAuth();

export default function AdminDeshbord() {
  const navigator = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("User signed out successfully");
        // Redirect the user to the sign-in page after successful sign-out
        navigator("/");
        // history.push("/signin"); // Redirect to sign-in page, adjust the route according to your application
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign-out error:", error);
        // You can display an error message to the user or handle the error in any other way
      });
  };

  return (
    <>
      <div className="h-screen">
        <Header />
        <Aside />
        <Main_Data />
        {/* <EmployeeRegister /> */}
      </div>
    </>
  );
}
