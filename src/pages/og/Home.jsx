import React from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/images/1.jpg"

export default function Home() {
  return (
    <>
      <section className="homePageBgImage">
        <div className="container mx-auto">
          <div className="flex flex-col min-h-screen items-center justify-center">
            <div className="homeCont w-[600px] h-[300px]">
              <h1 className="pt-10 text-5xl text-center text-white"> <span className="hh text-5xl">Welcome</span> <br /> <span className="hhh text-xl">To</span><br /> Employee Management Program</h1>
            </div>
            <div className="homeBtn mt-[55px]">
              <Link to={"/AdminLogin"} className="border bg-blue-500 text-white py-3 px-[5rem]">
                Click for Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
