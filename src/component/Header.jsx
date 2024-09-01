import React from "react";

function Header() {
  return (
    <div className="header">
      <div className="sidebar bg-pink-600">
        <div className="top w-full h-full">
          <div className="flex">
            <div className="topLogo p-5 bg-[#007c6d] text-center text-3xl text-white ">
              <h1>Employee MS</h1>
            </div>
            <div className="TopHeader bg-[#009486] flex justify-between p-5">
              <div className="bar text-white">
                <i className="ri-menu-line text-2xl"></i>
              </div>
              <div className="HeadEmail flex text-white pt-1">
                <i className="ri-user-3-fill me-2"></i>
                <h2>Welcome Back:Admin</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
