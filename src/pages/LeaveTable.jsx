import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function LeaveTable() {
  const dataBase = getDatabase(app);
  const [leaves, setLeaves] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(dataBase, "leaveType/");
    // console.log(dbRef);

    const cleanUp = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const temp = Object.keys(data).map((key, idx) => ({
          id: key,
          ...data[key],
        }));

        setLeaves(temp);
      } else {
        setLeaves([]);
      }
    });
    return () => cleanUp();
  }, []);

  const handleEdit = (id) => {
    // console.log(id);
    navigate(`/AdminDeshbord/LeaveTypeEdit/${id}`);
  };
  const handleDelete = async (id) => {
    const dbRef = ref(dataBase, `leaveType/${id}`);
    const result = await remove(dbRef);
    setLeaves((state) => state.filter((leave) => leave.id != id));
  };

  return (
    <>
      <h1 className="text-3xl text-white font-semibold text-center my-8"> Leave Table </h1>

      <div className="container m-auto text-right">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Leave Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves &&
                leaves.map((leave) => {
                  return (
                    <tr key={leave.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{leave.LeaveType}</td>

                      <td className="px-6 py-4 flex gap-5">
                        <button type="button" className="font-medium text-blue-600 hover:underline" onClick={() => handleEdit(leave.id)}>
                          Edit
                        </button>
                        <button type="button" className="font-medium text-red-600 hover:underline" onClick={() => handleDelete(leave.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
