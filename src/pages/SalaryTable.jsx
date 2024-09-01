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
    navigate(`/AdminDeshbord/SalaryEdit/${id}`);
  };

  // const handleDelete = async (id) => {
  //   const dbRef = ref(dataBase, `Employee/${id}`);
  //   const result = await remove(dbRef);
  //   setUsers((state) => state.filter((user) => user.id != id));
  // };
  return (
    <>
      <h1 className="text-3xl text border-b-4 font-semibold text-center my-8"> Salary History</h1>

      <div className="container m-auto text-right">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name <i className="ri-arrow-up-down-line"></i>
                </th>
                <th scope="col" className="px-6 py-3">
                  Department Name <i className="ri-arrow-up-down-line"></i>
                </th>
                <th scope="col" className="px-6 py-3">
                  Salary <i className="ri-arrow-up-down-line"></i>
                </th>
                <th scope="col" className="px-6 py-3">
                  Allowance <i className="ri-arrow-up-down-line"></i>
                </th>
                <th scope="col" className="px-6 py-3">
                  Total <i className="ri-arrow-up-down-line"></i>
                </th>
                <th scope="col" className="px-6 py-3">
                  Creation Date <i className="ri-arrow-up-down-line"></i>
                </th>
                <th scope="col" className="px-6 py-3">
                  Action <i className="ri-arrow-up-down-line"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, idx) => {
                  return (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{user.first_name || user.name || ""}</td>
                      <td className="px-6 py-4">{user.departments}</td>
                      <td className="px-6 py-4">{user.Salary}</td>
                      <td className="px-6 py-4">{user.AllowanceSalary}</td>
                      <td className="px-6 py-4">{user.Total}</td>
                      <td className="px-6 py-4">{user.CreationDate}</td>
                      <td className="px-6 py-4 flex gap-5">
                        <button
                          type="button"
                          className="font-medium bg-[#009487] outline-[#009487] ps-6 pe-6 pt-2 pb-2 text-white hover:bg-[#007269]"
                          onClick={() => handleEdit(user.id)}
                        >
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
