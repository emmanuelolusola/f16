import React from "react";
import { useNavigate } from "react-router-dom";

import arrow from "../../assets/chevron-down.svg";
import img from "../../assets/img1.png";

const Membership = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
      <div className="w-full fixed top-0 flex justify-between items-center py-[15px] lg:pb-0 lg:pt-[30px] px-[24px] lg:px-[96px] bg-white z-10">
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
      <div className="w-full px-[24px] lg:px-[96px]">
        <div className="mt-[50px] lg:mt-[70px] border border-b-black opacity-[10%]"></div>
      </div>
      <div className="w-full px-[24px] lg:w-[600px] lg:mx-auto lg:px-0 py-[20px] flex flex-col gap-8 lg:gap-8">
        <div className="w-full h-[66vh] lg:h-[80vh] overflow-hidden">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-full flex justify-center items-center">
          <img src={arrow} alt="" width={30} />
        </div>
      </div>

      <div className="flex flex-col gap-8 px-[24px] lg:w-[600px] lg:mx-auto lg:px-0 py-[40px] lg:py-[50px]">
        <p className="font-normal text-[18px] lg:text-[24px]">
          Over the years, I’ve built strong friendships and working
          relationships with some of Nigeria's most celebrated brands, artists
          and creatives. These friends have guided my decision-making around
          what moves to make and what ideas to incubate.
        </p>
        <p className="font-normal text-[18px] lg:text-[24px]">
          The launch of the Friends of 16 program celebrates these interactions
          and marks a new era for me as I expand the remit of this space as an
          incubator for Nigeria's emerging talent.
        </p>
        <p className="font-normal text-[18px] lg:text-[24px]">
          In exchange for a patronage fee, our suite of services provide a safe
          haven to unwind, network and be productive whilst enjoying exceptional
          amenities tailored exclusively for ‘Friends of 16’.
        </p>
        <p className="font-normal text-[18px] lg:text-[24px]">
          I hope you’ll join us as we explore the many potentials that our
          coming together will bring.
        </p>
        <p className="font-normal text-[18px] lg:text-[24px]">To friendship!</p>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[18px] lg:text-[24px]">
            Tushar Hathiramani
          </p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            Creative Director
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div
            className="w-full h-[66px] bg-[#0a0a0a] text-white text-[18px] lg:text-[24px] font-bold flex justify-center items-center"
            onClick={() => {
              navigate(`/membership/application`);
              scrollToTop();
            }}
          >
            Apply for membership
          </div>
          <div
            className="w-full h-[66px] border border-[#0a0a0a] bg-white text-[#0a0a0a] text-[18px] lg:text-[24px] font-bold flex justify-center items-center"
            onClick={() => {
              navigate(`/about`);
              scrollToTop();
            }}
          >
            Learn more about the program
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
