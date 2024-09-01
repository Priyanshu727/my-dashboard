import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/images/1.jpg"

export default function Home() {
  return (
    <>
      <section className="homePageBgImage">
        <div className="container mx-auto">
          <div className="flex flex-col min-h-screen items-end me-[50px] ">
            <div className="text-center">
              <div className="homeCont mt-11 w-[600px] h-[300px]">
                <h1 className="pt-10 text-5xl text-center text-white"> <span className="hh text-5xl">Welcome</span> <br /> <span className="hhh text-xl">To</span><br /> Employee Management Program</h1>
              </div>
              <div className="homeBtn mt-[20px] inline-block rounded-lg">
                <Link to={"/AdminLogin"} className="bg-[#377994] text-white py-3 px-[5rem] block rounded-lg">
                  Click to Login <i class="ri-arrow-right-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
