import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import logo from "../../assets/logo.svg";

const VerifyToken = () => {
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

  return <Navigate to="/login" />;
};

export default VerifyToken;
