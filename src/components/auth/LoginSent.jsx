import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LoginSent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from URL parameters
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");

  // Create mailto link
  const mailtoLink = `mailto:${email}`;

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="w-full h-[100dvh] py-[10px] lg:py-[20px]">
      <div className="bg-white fixed w-full top-0 px-[24px] lg:px-[96px] pt-[10px]">
        <div className="w-full flex justify-between items-center mt-[15px]">
          <p
            className="font-bold text-[18px] lg:text-[24px]"
            onClick={() => {
              navigate(`/`);
              scrollToTop();
            }}
          >
            16/16
          </p>
          <button
            className="font-normal text-[18px] lg:text-[24px]"
            onClick={() => {
              navigate(-1);
              scrollToTop();
            }}
          >
            Close
          </button>
        </div>
        <hr className="mt-[20px] opacity-30" />
      </div>
      <div className="h-[80px] lg:h-[120px]"></div>
      <div className="w-full h-[80vh] px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold text-[18px] lg:text-[24px]">
            Login link sent
          </p>
          <div className="w-full flex flex-col gap-0">
            <p className="text-[18px] lg:text-[24px] font-normal">
              Your profile login link has been sent to {email}
            </p>
          </div>
          <a href={mailtoLink} className="link-no-highlight w-full">
            <button className="w-full h-[74px] text-[18px] font-bold bg-black text-white">
              Open Mail
            </button>
          </a>
        </div>
        <div className="w-full cursor-pointer" onClick={() => navigate(`/`)}>
          <p className="text-[18px] lg:text-[24px] font-normal text-center">
            Close
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSent;
