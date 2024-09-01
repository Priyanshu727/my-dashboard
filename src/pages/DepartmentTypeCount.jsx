import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

export default function DepartmentTypeCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, `Departments`);

    // Listen for changes to the count of users with the specified role
    const DepartmentsCount = onValue(usersRef, (Departments) => {
      let totalCount = 0;

      Departments.forEach((Department) => {
        totalCount++;
      });
      setCount(totalCount);
    });

    // Clean up listener when component unmounts
    return () => {
      DepartmentsCount();
    };
  }, []);

  return (
    <div>
      <h3>DepartmentTypeCount</h3>
      <span>Count : {count}</span>
    </div>
  );
}
