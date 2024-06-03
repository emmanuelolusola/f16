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
      <div className="w-full px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col gap-8 pb-10">
        <div className="flex flex-col gap-2 mt-[20px] lg:mt-[50px]">
          <p className="text-[18px] lg:text-[24px] font-bold">Payments</p>
        </div>
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex justify-center">
            <div className="w-full h-[200px] lg:h-[400px] bg-black rounded-[10px] lg:rounded-[20px] p-6 flex flex-col justify-between">
              <p className="text-[18px] lg:text-[24px] font-normal text-white">
                My Card
              </p>
              <div className="flex flex-col gap-4 lg:gap-8">
                <p className="text-[18px] lg:text-[24px] font-bold text-center text-white">
                  **** **** **** 1234
                </p>
                <div className="flex justify-between">
                  <p className="text-[18px] lg:text-[24px] font-normal  text-white">
                    Opemipo Aikomo
                  </p>
                  <p className="text-[18px] lg:text-[24px] font-normal  text-white">
                    01/24
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-0">
              <p className="w-full text-[18px] lg:text-[24px] font-normal text-[#5E5E5E]">
                Amount
              </p>
              <p className="w-full text-[18px] lg:text-[24px] font-normal">
                $150
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="w-full text-[18px] lg:text-[24px] font-normal text-[#5E5E5E]">
                Start
              </p>
              <p className="w-full text-[18px] lg:text-[24px] font-normal">
                July 10, 2024
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="w-full text-[18px] lg:text-[24px] font-normal text-[#5E5E5E]">
                Duration
              </p>
              <p className="w-full text-[18px] lg:text-[24px] font-normal">
                6 months
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="w-full text-[18px] lg:text-[24px] font-normal text-[#5E5E5E]">
                Expires
              </p>
              <p className="w-full text-[18px] lg:text-[24px] font-normal">
                January 10, 2024
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 justify-center">
            <button
              className="w-full h-[74px] text-[18px] font-bold bg-black text-white"
              // onClick={() => navigate(`/profile/payment`)}
            >
              Cancel Membership
            </button>
            <button
              className="w-full h-[74px] text-[18px] font-bold border border-black text-black"
              // onClick={() => navigate(`/profile/payment`)}
            >
              Change Card
            </button>
          </div>
          <div className="w-full flex justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePayment;
