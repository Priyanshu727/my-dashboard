import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

// import app from "../firebase/firebase";

export default function EmployeeCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, `Employee`);

    // Listen for changes to the count of users with the specified role
    const unsubscribe = onValue(usersRef, (snapshot) => {
      let totalCount = 0;

      snapshot.forEach((childSnapshot) => {
        // const userData = childSnapshot.val();
        totalCount++;

        // Check if the user's role matches the specified role
        // if (userData.role === role) {
        // totalCount++;
        // }
      });
      setCount(totalCount);
    });

    // Clean up listener when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div>
      <h3>EmployeeCount</h3>
      <span>Count : {count}</span>
    </div>
  );
}
