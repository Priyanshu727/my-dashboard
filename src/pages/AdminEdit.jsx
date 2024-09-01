import { getDatabase, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import app from "../firebase/firebase";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";

export default function AdminEdit() {
  const params = useParams();
  const id = params.id;
  const dataBase = getDatabase(app);

  console.log(id);

  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    currentPassword: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth(app);

    const dbRef = ref(dataBase, `admin/${id}`);
    await update(dbRef, input);

    console.log(input.password);

    if (input.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return; // Exit the function if the password is too short
    }

    try {
      // Reauthenticate the user before updating the password
      const credential = EmailAuthProvider.credential(auth.currentUser.email, input.currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update the password in Firebase Authentication
      await updatePassword(auth.currentUser, input.password);

      // Navigate back to AdminList
      navigate("/AdminList");
    } catch (error) {
      console.error("Error updating password:", error);
      // Handle error (e.g., display error message)
    }
  };

  useEffect(() => {
    if (id) {
      const dbRef = ref(dataBase, `admin/${id}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        setInput(data);
        console.log(data);
      });
    } else {
      navigate("/AdminList");
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
          <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium text-white">
            Current password
          </label>
          <input
            type="password"
            id="currentPassword"
            placeholder="Enter Your Current Password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={input.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
            Your New password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Your New Password"
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
          to="/"
          className="ms-5 bg-gray-300 hover:bg-gray-800 text-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Back
        </Link>
      </form>
    </div>
  );
}
