import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function SalaryTable() {
  const dataBase = getDatabase(app);
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(dataBase, "Employee/");
    const cleanUp = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const temp = Object.keys(data).map((key, idx) => ({
          id: key,
          ...data[key],
        }));

        setUsers(temp);

        // console.log(temp);
        //       temp.map((user, idx) => {
        //         console.log(user.id);
        //       });
      }
    });
    return () => cleanUp();
  }, []);

  const handleEdit = (id) => {
    navigate(`/SalaryEdit/${id}`);
  };

  // const handleDelete = async (id) => {
  //   const dbRef = ref(dataBase, `Employee/${id}`);
  //   const result = await remove(dbRef);
  //   setUsers((state) => state.filter((user) => user.id != id));
  // };
  return (
    <>
      <h1 className="text-3xl text-white font-semibold text-center my-8"> Edit Admin</h1>

      <div className="container m-auto text-right">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary
                </th>
                <th scope="col" className="px-6 py-3">
                  AllowanceSalary
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, idx) => {
                  return (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.Salary}</td>
                      <td className="px-6 py-4">{user.AllowanceSalary}</td>
                      <td className="px-6 py-4">{user.Total}</td>
                      <td className="px-6 py-4 flex gap-5">
                        <button type="button" className="font-medium text-blue-600 hover:underline" onClick={() => handleEdit(user.id)}>
                          Edit
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
