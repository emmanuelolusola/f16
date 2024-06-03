import React, { useEffect, useState } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const VerifyToken = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [isValid, setIsValid] = useState(null);
  async function verifyToken() {
    try {
      const response = await fetch(`http://localhost:3000/api/${token}`);
      if (response.data) {
        setIsValid(true);
      }
    } catch (error) {
      setIsValid(false);
      console.log(error);
    }
  }
  useEffect(() => {
    verifyToken();
    console.log("error");
  }, []);

  if (isValid === null) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="w-full h-[80vh] flex flex-col justify-between items-center">
          <p className="font-bold text-[18px] lg:text-[24px]">Friends of 16</p>
          <img src={logo} alt="" />
          <div className="flex flex-col gap-4 justify-center items-center">
            <p className="font-normal text-[18px] lg:text-[24px]">Logging In</p>
            <div
              className="w-8 h-8 border-4 border-t-4 border-black rounded-full animate-spin"
              style={{
                borderTopColor: "transparent",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
  if (isValid === true) {
    return <Navigate to="/profile/payment" />;
  }

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="w-full h-[100dvh] py-[10px] lg:py-[20px] flex flex-col justify-between">
      <div className="w-full flex justify-between items-center py-[10px] lg:pb-0 lg:pt-[30px] px-[24px] lg:px-[96px] bg-white z-10">
        <p
          className="font-bold text-[18px] lg:text-[24px]"
          onClick={() => {
            navigate(`/`);
            scrollToTop();
          }}
        >
          16/16
        </p>
        <p
          className="font-normal text-[18px] lg:text-[24px] cursor-pointer"
          onClick={() => {
            navigate(`/menu`);
            scrollToTop();
          }}
        >
          Menu
        </p>
      </div>
      <p className="font-normal text-[18px] lg:text-[24px] text-[#ff0000] text-center">
        Invalid Login Token
      </p>
      <div className="w-full lg:w-[600px] px-[24px] lg:px-0 lg:mx-auto mb-6">
        <button
          className="w-full h-[74px] text-[18px] font-bold border border-black text-black"
          onClick={() => navigate(`/login`)}
        >
          Log In
        </button>
      </div>
    </div>
  );
};

export default VerifyToken;
