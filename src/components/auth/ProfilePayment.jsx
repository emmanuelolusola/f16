import React from "react";
import { useNavigate } from "react-router-dom";

const ProfilePayment = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scroll(0, 0);
  };
  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
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
      <div className="h-[60px] lg:h-[40px]"></div>
      <div className="w-full h-[90vh] px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col justify-between gap-8 pb-10">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2 mt-[20px] lg:mt-[50px]">
            <p className="text-[18px] lg:text-[24px] font-bold">Payments</p>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className="w-full p-4 border-2 border-[#E0E0E0] flex flex-col gap-2">
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                  Plan Amount
                </p>
                <p className="text-black font-normal text-[18px] lg:text-[24px]">
                  $150
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                  Duration
                </p>
                <p className="text-black font-normal text-[18px] lg:text-[24px]">
                  6 months
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                  Start
                </p>
                <p className="text-black font-normal text-[18px] lg:text-[24px]">
                  July 10, 2024
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                  Expires
                </p>
                <p className="text-black font-normal text-[18px] lg:text-[24px]">
                  January 10, 2025
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 justify-center">
          <button
            className="w-full h-[74px] text-[18px] font-bold bg-black text-white"
            // onClick={() => navigate(`/profile/payment`)}
          >
            Cancel Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePayment;
