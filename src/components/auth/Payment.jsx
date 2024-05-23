import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow_forward_ios.svg";
import { PAYMENT } from "../../utils/constants";

const Payment = () => {
  const navigate = useNavigate();

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
      <div className="w-full h-[82dvh] px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold text-[18px] lg:text-[24px]">
            Welcome, Opemipo
          </p>
          <div className="w-full flex flex-col gap-0">
            <p className="text-[18px] lg:text-[24px] font-normal">
              Choose a payment option to activate your Friends of 16 membership.
            </p>
          </div>
          {PAYMENT.map((option) => (
            <div
              key={option.id}
              className="w-full flex justify-between items-center border border-[#e0e0e0] py-4 px-4"
              onClick={() =>
                navigate(`/profile/payment/confirm`, { state: option })
              }
            >
              <div className="flex flex-col">
                <p className="font-bold text-[18px] lg:text-[24px]">
                  Pay {option.amount}
                </p>
                <p className="text-[18px] lg:text-[24px] font-normal">
                  For {option.period}
                </p>
              </div>
              <img src={arrow} alt="" />
            </div>
          ))}
        </div>
        <div
          className="w-full cursor-pointer"
          onClick={() => navigate(`/profile/menu`)}
        >
          <p className="text-[18px] lg:text-[24px] font-normal text-center underline underline-offset-2">
            I'll do this later
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
