import { getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

export default function LeaveTypeCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, `leaveType`);

    // Listen for changes to the count of users with the specified role
    const LeaveCount = onValue(usersRef, (leaves) => {
      let totalCount = 0;

      leaves.forEach((leave) => {
        totalCount++;
      });
      setCount(totalCount);
    });

    // Clean up listener when component unmounts
    return () => {
      LeaveCount();
    };
  }, []);

  return (
    <div>
      <h3>LeaveTypeCount</h3>
      <span>Count : {count}</span>
    </div>
  );
}
