import React from "react";
import EmployeeCount from "../pages/EmployeeCount";
import LeaveTypeCount from "../pages/LeaveTypeCount";
import DepartmentTypeCount from "../pages/DepartmentTypeCount";
import LeaveApplied from "../pages/LeaveApplied";
import LeaveNewReq from "../pages/LeaveNewReq";
import LeaveReqRejected from "../pages/LeaveReqRejected";
import LeaveReqApprove from "../pages/LeaveReqApprove";

export default function MainDesk() {
  return (
    <>
      <div className="container mt-[50px]">
        <div className="text-center text-6xl font-semibold text-[#009486]">Admin Deshbord</div>
        <div className="MainDesh flex justify-center items-center">
          <div className="div flex leading-10 mt-10">
            <div className="div mr-[20px] flex border-2 rounded-lg overflow-hidden w-[400px] h-[104px] bg-[white]">
              <div className="DivLog bg-[#009488] h-[100px] w-[150px] mr-auto text-center py-[30px]">
                <i className="ri-user-fill text-4xl text-white"></i>
              </div>
              <div className="div  mr-[75px] mt-[10px] text-[#009486] text-[20px] ">
                <EmployeeCount />
              </div>
            </div>
            <div className="div mr-[20px] flex border-2 rounded-lg overflow-hidden w-[400px]  h-[104px] bg-[white]">
              <div className="DivLog bg-[#f8be0f] h-[100px] w-[150px] mr-auto text-center py-[30px]">
                <i className="ri-file-copy-line text-4xl text-white"></i>
              </div>
              <div className="div  mr-[75px] mt-[10px] text-[#009486] text-[20px]">
                <LeaveTypeCount />
              </div>
            </div>
            <div className="div mr-[20px] flex border-2 rounded-lg overflow-hidden w-[400px] h-[104px] bg-[white]">
              <div className="DivLog bg-[#d83340] h-[100px] w-[150px] mr-auto text-center py-[30px]">
                <i className="ri-star-fill text-4xl text-white"></i>
              </div>
              <div className="div mr-[20px] mt-[10px] text-[#009486] text-[20px]">
                <DepartmentTypeCount />
              </div>
            </div>
          </div>
        </div>
        <div className="leavedetail border-t-[2px] border-b-[2px] border-[#d9d9d9] text-center mt-[80px] py-5">
          <span className=" text-4xl font-semibold">Leaves Details</span>
        </div>

        <div className="FourElement flex mt-[80px]">
          <div className="w-1/2 ml-[20px] mr-[20px] flex border-2 rounded-lg overflow-hidden bg-[white]">
            <div className="DivLog bg-[#16a2b6] h-[100px] w-[150px]  text-center py-[30px]">
              <i className="ri-file-copy-line text-4xl text-white"></i>
            </div>
            <div className="div ml-[50px] mt-[20px] text-[#009486] text-[20px] ">
              <LeaveApplied />
            </div>
          </div>

          <div className="w-1/2 mr-[20px] flex border-2 rounded-lg overflow-hidden bg-[white]">
            <div className="DivLog bg-[#f8be0f] h-[100px] w-[150px]  text-center py-[30px]">
              <i className="ri-file-3-line text-4xl text-white"></i>
            </div>
            <div className="div ml-[50px]  mt-[20px] text-[#009486] text-[20px]">
              <LeaveNewReq />
            </div>
          </div>
        </div>

        <div className="FourElement flex mt-[50px] ">
          <div className="w-1/2 ml-[20px] mr-[20px] flex border-2 rounded-lg overflow-hidden bg-[white]">
            <div className="DivLog bg-[#d83340] h-[100px] w-[150px]  text-center py-[30px]">
              <i className="ri-file-3-line text-4xl text-white"></i>
            </div>
            <div className="div ml-[50px] mt-[20px] text-[#009486] text-[20px]">
              <LeaveReqRejected />
            </div>
          </div>

          <div className="w-1/2 mr-[20px] flex border-2 rounded-lg overflow-hidden bg-[white]">
            <div className="DivLog bg-[#009488] h-[100px] w-[150px]  text-center py-[30px]">
              <i className="ri-file-3-line text-4xl text-white"></i>
            </div>
            <div className="div ml-[50px] mt-[10px] text-[#009486] text-[20px]">
              <LeaveReqApprove />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
