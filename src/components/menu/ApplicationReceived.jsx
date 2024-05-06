import React from "react";
import { useNavigate } from "react-router-dom";

const ApplicationReceived = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
      <div className="w-full fixed top-0 flex justify-between items-center py-[15px] lg:pb-0 lg:pt-[30px] px-[24px] lg:px-[96px] bg-white z-10">
        <p className="font-bold text-[18px] lg:text-[24px]">16/16</p>
        <p
          className="font-normal text-[18px] lg:text-[24px] cursor-pointer"
          onClick={() => navigate(`/menu`)}
        >
          Menu
        </p>
      </div>
      <div className="w-full px-[24px] lg:px-[96px]">
        <div className="mt-[50px] lg:mt-[70px] border border-b-black opacity-[10%]"></div>
      </div>
      <div className="h-[88dvh] flex flex-col justify-between">
        <div className="px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col gap-4 lg:gap-8">
          <div className="flex flex-col gap-4 mt-[20px] lg:mt-[50px]">
            <p className="text-[18px] lg:text-[24px] font-bold lg:text-center">
              Application complete
            </p>
          </div>
          <p className="text-[18px] lg:text-[24px] leading-[32px] lg:leading-[42px] lg:text-center">
            We’ve received your membership application. Thanks! Please check
            your inbox for a confirmation email.
          </p>
        </div>
        <div className="w-full lg:w-[50%] px-[24px] lg:px-[96px] lg:mx-auto">
          <button
            className="w-full lg:w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] lg:text-[24px] font-bold mb-[10px] lg:mx-auto"
            onClick={() => navigate(`/`)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationReceived;
