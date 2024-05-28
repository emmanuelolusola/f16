import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

const PaymentConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount, period } = location.state || {
    amount: "$150",
    period: "6 months",
  };

  // Get the current date
  const startDate = moment();
  const formattedStartDate = startDate.format("MMMM DD, YYYY");

  // Determine the period and add to the start date accordingly
  let endDate;
  if (period === "one year") {
    endDate = moment(startDate).add(1, "year");
  } else if (period.endsWith("months")) {
    const periodAmount = parseInt(period.split(" ")[0], 10);
    endDate = moment(startDate).add(periodAmount, "months");
  } else {
    // Default to 6 months if the period is not recognized
    endDate = moment(startDate).add(6, "months");
  }
  const formattedEndDate = endDate.format("MMMM DD, YYYY");

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
      <div className="w-full h-[82dvh] px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col justify-between">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-col gap-0">
            <p className="font-bold text-[18px] lg:text-[24px]">Pay {amount}</p>
            <p className="text-[18px] lg:text-[24px] font-normal">
              Activate your membership
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-[18px] lg:text-[24px] font-normal">
              Amount to Pay
            </p>
            <p className="text-[18px] lg:text-[24px] font-bold">{amount}</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-[18px] lg:text-[24px] font-normal">
              Payment Period
            </p>
            <p className="text-[18px] lg:text-[24px] font-bold">{period}</p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-[18px] lg:text-[24px] font-normal">Start Date</p>
            <p className="text-[18px] lg:text-[24px] font-bold">
              {formattedStartDate}
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <p className="text-[18px] lg:text-[24px] font-normal">End Date</p>
            <p className="text-[18px] lg:text-[24px] font-bold">
              {formattedEndDate}
            </p>
          </div>
        </div>
        <button className="w-full h-[74px] text-[18px] font-bold bg-black text-white">
          Pay {amount}
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirm;
