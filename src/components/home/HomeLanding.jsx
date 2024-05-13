import React from "react";
import { useNavigate } from "react-router-dom";

import arrow from "../../assets/chevron-down.svg";

import gif from "../../assets/gif.gif";

const HomeLanding = () => {
  const navigate = useNavigate();
  const scrollToEvent = () => {
    window.scrollTo({
      top: 670,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full h-[100dvh] py-[100px] lg:py-[100px] flex flex-col justify-end items-center gap-[20dvh] lg:gap-[18vh]">
      <img src={gif} alt="" className="w-[100px] lg:w-[150px]" />
      <div className="flex flex-col items-center gap-[60px] lg:gap-20">
        <p className="text-[18px] lg:text-[24px] text-center px-[32px]">
          16/16 is a serene space for
          <br /> intimate experiences designed
          <br /> to attract and serve creatives
        </p>
        <img
          src={arrow}
          alt=""
          width={30}
          onClick={() => {
            navigate(`/`);
            scrollToEvent();
          }}
        />
      </div>
    </div>
  );
};

export default HomeLanding;
