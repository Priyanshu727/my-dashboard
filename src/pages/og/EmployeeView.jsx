import { getDatabase, onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import app from "../firebase/firebase";
import img from "../assets/images/user.png";

export default function EmployeeView() {
  const params = useParams();
  const id = params.id;
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  // console.log(input);

  const dataBase = getDatabase(app);

  useEffect(() => {
    const dbRef = ref(dataBase, `Employee/${id}`);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setInput(data);
      console.log(data);
    });
  }, []);

  const handleBack = () => {
    navigate("/EmployeeList");
  };

  return (
    <div>
      <div className="bg-[#009487] h-32 pt-9">
        <h1 className="text-center text-4xl font-semibold text-white"> Employee Detail</h1>
      </div>
      <div className="flex">
        <div className="w-1/5 border"></div>
        <div className="w-4/5 border p-5">
          <table className="border-separate border-spacing-2 border border-slate-400 w-full shadow-2xl">
            <tbody>
              <tr>
                <th className="text-start ps-3 border p-3">EmpID</th>
                <td className="border ps-3 py-2">{input.EmployeeId}</td>
                <th className="text-start ps-3 border">Photo</th>
                <td className="border ps-3 py-2">
                  <img src={img} width="100px" alt="" />
                </td>
              </tr>
              <tr>
                <th className="text-start ps-3 border">First Name</th>
                <td className="border ps-3 py-2">Columbus</td>
                <th className="text-start ps-3 border">Last Name</th>
                <td className="border ps-3 py-2">Columbus</td>
              </tr>
              <tr>
                <th className="text-start ps-3 border">Department</th>
                <td className="border ps-3 py-2">Detroit</td>
                <th className="text-start ps-3 border">Email</th>
                <td className="border ps-3 py-2">Detroit</td>
              </tr>
              <tr>
                <th className="text-start ps-3 border">DOB</th>
                <td className="border ps-3 py-2">Detroit</td>
                <th className="text-start ps-3 border">Date Of Joining</th>
                <td className="border ps-3 py-2">Detroit</td>
              </tr>
              <tr>
                <th className="text-start ps-3 border">Address</th>
                <td className="border ps-3 py-2">Detroit</td>
                <th className="text-start ps-3 border">City</th>
                <td className="border ps-3 py-2">Detroit</td>
              </tr>
              <tr>
                <th className="text-start ps-3 border">State</th>
                <td className="border ps-3 py-2">Detroit</td>
                <th className="text-start ps-3 border">Country</th>
                <td className="border ps-3 py-2">Detroit</td>
              </tr>
              <tr>
                <th className="text-start ps-3 border">Mobile</th>
                <td className="border ps-3 py-2">Detroit</td>
                <td colSpan="2">
                  <div className="flex">
                    <button className="bg-[#22873a] text-white hover:bg-[#18712b] w-full me-2 p-2">Edit Detail</button>
                    <button className="bg-[#cc9c02] text-white hover:bg-[#e1ac02] w-full mx-2 p-2">Salary History</button>
                    <button className="bg-[#b12a35] text-white hover:bg-[#c42232] w-full ms-2 p-2">Leave History</button>
                    <button onClick={() => handleBack()} className="bg-[#2e2ab1] text-white hover:bg-[#4022c4] w-full ms-2 p-2">
                      Back
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
