import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminRegister from "./pages/AdminRegister.jsx";
import AdminList from "./pages/AdminList.jsx";
import AdminEdit from "./pages/AdminEdit.jsx";
import AdminDeshbord from "./pages/AdminDeshbord.jsx";

// import EmployeeLogin from "./pages/EmployeeLogin.jsx";
// import EmployeeRegister from "./pages/EmployeeRegister.jsx";
// import EmployeeList from "./pages/EmployeeList.jsx";
// import EmployeeEdit from "./pages/EmployeeEdit.jsx";
import EmployeeDeshbord from "./pages/EmployeeDeshbord.jsx";

// import LeaveTable from "./pages/LeaveTable.jsx";
// import LeaveTypeAdd from "./pages/LeaveTypeAdd.jsx";
// import LeaveTypeEdit from "./pages/LeaveTypeEdit.jsx";
import LeaveApplication from "./pages/LeaveApplication.jsx";

// import DepartmentTable from "./pages/DepartmentTable.jsx";
// import DepartmentTypeAdd from "./pages/DepartmentTypeAdd.jsx";
// import DepartmentTypeEdit from "./pages/DepartmentTypeEdit.jsx";
// import EmployeeView from "./pages/EmployeeView.jsx";

// import SalaryAdd from "./pages/SalaryAdd.jsx";
// import SalaryTable from "./pages/SalaryTable.jsx";
// import SalaryEdit from "./pages/SalaryEdit.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/AdminLogin" element={<AdminLogin />} />
      <Route path="/AdminRegister" element={<AdminRegister />} />
      <Route path="/AdminList" element={<AdminList />} />
      <Route path="/AdminEdit/:id" element={<AdminEdit />} />
      <Route path="/AdminDeshbord//*" element={<AdminDeshbord />}>
        <Route path="DepartmentTable" />
        <Route path="DepartmentTypeAdd" />
        <Route path="DepartmentTypeEdit/:id" />

        <Route path="LeaveTable" />
        <Route path="LeaveTypeAdd" />
        <Route path="LeaveTypeEdit/:id" />

        <Route path="EmployeeRegister" />
        <Route path="EmployeeList" />
        <Route path="EmployeeEdit/:id" />
        <Route path="EmployeeView/:id" />

        <Route path="SalaryTable" />
        <Route path="SalaryAdd" />
        <Route path="SalaryEdit/:id" />
      </Route>

      {/* <Route path="/EmployeeLogin" element={<EmployeeLogin />} /> */}
      {/* <Route path="EmployeeRegister" element={<EmployeeRegister /> /> */}
      {/* <Route path="/EmployeeList" element={<EmployeeList />} /> */}
      {/* <Route path="/EmployeeEdit/:id" element={<EmployeeEdit />} /> */}
      {/* <Route path="/EmployeeView/:id" element={<EmployeeView />} /> */}
      <Route path="/EmployeeDeshbord" element={<EmployeeDeshbord />} />

      {/* <Route path="/DepartmentTable" element={<DepartmentTable />} /> */}
      {/* <Route path="/DepartmentTypeAdd" element={<DepartmentTypeAdd />} /> */}
      {/* <Route path="/DepartmentTypeEdit/:id" element={<DepartmentTypeEdit />} /> */}

      {/* <Route path="/LeaveTable" element={<LeaveTable />} /> */}
      {/* <Route path="/LeaveTypeAdd" element={<LeaveTypeAdd />} /> */}
      {/* <Route path="/LeaveTypeEdit/:id" element={<LeaveTypeEdit />} /> */}

      {/* <Route path="/SalaryTable" element={<SalaryTable />} /> */}
      {/* <Route path="/SalaryAdd" element={<SalaryAdd />} /> */}
      {/* <Route path="/SalaryEdit/:id" element={<SalaryEdit />} /> */}

      <Route path="/LeaveApplication" element={<LeaveApplication />} />
    </Routes>
  );
}

export default App;
