import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useHistory for programmatic navigation

const auth = getAuth();

export default function EmployeeDeshbord() {
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
      <button className="border  mt-5 py-2 px-3 rounded-4 shadow-lg" onClick={handleSignOut}>
        Sign Out
      </button>
      <div>EmployeeDeshbord</div>;
    </>
  );
}
