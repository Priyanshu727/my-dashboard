import React from "react";
import EmployeeCount from "../pages/EmployeeCount";
import LeaveTypeCount from "../pages/LeaveTypeCount";
import DepartmentTypeCount from "../pages/DepartmentTypeCount";

import EmployeeRegister from "../pages/EmployeeRegister";
import { Route, Routes } from "react-router-dom";
import MainDesk from "./MainDesk";
import EmployeeList from "../pages/EmployeeList";
import EmployeeEdit from "../pages/EmployeeEdit";
import EmployeeView from "../pages/EmployeeView";
import DepartmentTable from "../pages/DepartmentTable";
import DepartmentTypeAdd from "../pages/DepartmentTypeAdd";
import DepartmentTypeEdit from "../pages/DepartmentTypeEdit";
import LeaveTable from "../pages/LeaveTable";
import LeaveTypeAdd from "../pages/LeaveTypeAdd";
import LeaveTypeEdit from "../pages/LeaveTypeEdit";
import SalaryTable from "../pages/SalaryTable";
import SalaryAdd from "../pages/SalaryAdd";
import SalaryEdit from "../pages/SalaryEdit";

const Main_Data = () => {
  return (
    <>
      <section className="main_data">
        <Routes>
          <Route path="/" element={<MainDesk />} />

          <Route path="/DepartmentTable" element={<DepartmentTable />} />
          <Route path="/DepartmentTypeAdd" element={<DepartmentTypeAdd />} />
          <Route path="/DepartmentTypeEdit/:id" element={<DepartmentTypeEdit />} />

          <Route path="/LeaveTable" element={<LeaveTable />} />
          <Route path="/LeaveTypeAdd" element={<LeaveTypeAdd />} />
          <Route path="/LeaveTypeEdit/:id" element={<LeaveTypeEdit />} />

          <Route path="/EmployeeRegister" element={<EmployeeRegister />} />
          <Route path="/EmployeeList" element={<EmployeeList />} />
          <Route path="/EmployeeEdit/:id" element={<EmployeeEdit />} />
          <Route path="/EmployeeView/:id" element={<EmployeeView />} />

          <Route path="/SalaryTable" element={<SalaryTable />} />
          <Route path="/SalaryAdd" element={<SalaryAdd />} />
          <Route path="/SalaryEdit/:id" element={<SalaryEdit />} />
        </Routes>
        {/* <EmployeeRegister /> */}
      </section>
    </>
  );
};

export default Main_Data;
