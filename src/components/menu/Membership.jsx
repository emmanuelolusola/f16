import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import arrow from "../../assets/chevron-down.svg";
import img from "../../assets/img1.png";

const Membership = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
      <Helmet>
        <title>Apply Now</title>
        <meta name="title" content="Apply for Membership" />
        <meta property="og:title" content="Apply for Membership" />
        <meta property="twitter:title" content="Apply for Membership" />
      </Helmet>
      <div className="w-full fixed top-0 flex justify-between items-center py-[15px] lg:pb-0 lg:pt-[30px] px-[24px] lg:px-[96px] bg-white z-10">
        <p
          className="font-bold text-[18px] cursor-pointer"
          onClick={() => {
            navigate(`/`);
            scrollToTop();
          }}
        >
          16/16
        </p>
        <p
          className="font-normal text-[18px] cursor-pointer"
          onClick={() => {
            navigate(`/menu`);
            scrollToTop();
          }}
        >
          Menu
        </p>
      </div>
      <div className="w-full px-[24px] lg:px-[96px]">
        <div className="mt-[50px] lg:mt-[70px]"></div>
      </div>
      <div className="w-full px-[24px] lg:w-[600px] lg:mx-auto lg:px-0 py-[20px] flex flex-col gap-8 lg:gap-8">
        <p className="text-[18px] font-bold">Friends of 16</p>
        <div className="w-full h-[66vh] lg:h-[80vh] overflow-hidden">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-full flex justify-center items-center">
          <img src={arrow} alt="" width={30} />
        </div>
      </div>

      <div className="flex flex-col gap-4 px-[24px] lg:w-[600px] lg:mx-auto lg:px-0 pb-[40px] lg:pb-[50px]">
        <p className="font-normal text-[18px]">
          Over the years, we’ve built strong friendships and working
          relationships with some of Nigeria's most celebrated brands, artists
          and creatives. These friends have guided my decision-making around
          what moves to make and what ideas to incubate.
        </p>
        <p className="font-normal text-[18px]">
          The launch of the Friends of 16 program celebrates these interactions
          and marks a new era for me as I expand the remit of this space as an
          incubator for Nigeria's emerging talent.
        </p>
        <p className="font-normal text-[18px]">
          In exchange for a membership fee, our suite of services—work and play
          spaces, a bespoke hotel and a full service bar—provide a safe haven to
          unwind, network and be productive in, whilst enjoying amenities
          tailored exclusively for 'Friends of 16.'
        </p>
        <p className="font-normal text-[18px]">
          I hope you’ll join us as we explore the many potentials that our
          coming together will bring. To friendship!
        </p>
        <div className="flex flex-col gap-4 mt-4">
          <div
            className="w-full h-[66px] bg-[#0a0a0a] text-white text-[18px] font-bold flex justify-center items-center cursor-pointer"
            onClick={() => {
              navigate(`/membership/application`);
              scrollToTop();
            }}
          >
            Apply for membership
          </div>
          <div
            className="w-full h-[66px] border border-[#0a0a0a] bg-white text-[#0a0a0a] text-[18px] font-bold flex justify-center items-center cursor-pointer"
            onClick={() => {
              navigate(`/membership/about`);
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
