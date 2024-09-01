import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useEffect, useState } from "react";
import app from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";

export default function DepartmentTable() {
  const dataBase = getDatabase(app);
  const [departments, setDepartments] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const dbRef = ref(dataBase, "Departments/");
    // console.log(dbRef);

    const cleanUp = onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const temp = Object.keys(data).map((key, idx) => ({
          id: key,
          ...data[key],
        }));

        setDepartments(temp);
      } else {
        setDepartments([]);
      }
    });
    return () => cleanUp();
  }, []);

  const handleEdit = (id) => {
    // console.log(id);
    navigate(`/AdminDeshbord/DepartmentTypeEdit/${id}`);
  };

  const handleDelete = async (id) => {
    const dbRef = ref(dataBase, `Departments/${id}`);
    const result = await remove(dbRef);
    setDepartments((state) => state.filter((department) => department.id != id));
  };

  return (
    <>
      <h1 className="text-3xl text-white font-semibold text-center my-8"> Department Table </h1>

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
              {departments &&
                departments.map((department) => {
                  return (
                    <tr key={department.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{department.name}</td>

                      <td className="px-6 py-4 flex gap-5">
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:underline"
                          onClick={() => handleEdit(department.id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:underline"
                          onClick={() => handleDelete(department.id)}
                        >
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
