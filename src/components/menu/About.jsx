import React from "react";

import gif from "../../assets/gif.gif";
import image from "../../assets/about.jpg";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scroll(0, 0);
  };
  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
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
      <div className="px-[24px] lg:px-0 lg:w-[600px] lg:mx-auto flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-4 mt-[60px] lg:mt-[100px]">
          <p className="text-[18px] font-bold">About 16/16</p>
          <img src={image} alt="" className="w-full pb-0" />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-[18px]">
            <span className="font-bold">16/16</span> is a serene space for
            intimate experiences designed to attract and serve creatives,
            providing them a safe haven to unwind, network and be productive
            whilst enjoying exceptional amenities tailored exclusively for our
            network of Friends.
          </p>
          <p className="text-[18px]">
            Our creative hub and networking space has evolved over the years to
            become a space that marries comfort with serenity and productivity
            while upholding humility and excellence at the core of our
            operations.
          </p>
          <p className="text-[18px]">
            We are one part of a larger creative expression where hospitality
            and creativity meet the city of Lagos. Together, this network is a
            model of the future of the city and includes{" "}
            <span className="underline">Thai Thai</span> (a Thai food restaurant
            located in the same building as us),{" "}
            <span className="underline">hFACTOR</span> (a creative collective
            and social enterprise) and Designlab (an upcycling interior design
            studio). We invite you to step into our world as we leap into yours.
          </p>
          <p className="text-[18px]">Visit 16/16 to enjoy our offerings.</p>
        </div>

        <div className="w-full flex flex-col">
          <p className="font-bold text-[18px] w-full py-[12px] border-b border-black ">
            Co-working
          </p>
          <p className="font-bold text-[18px] w-full py-[12px] border-b border-black ">
            Hotel accommodation
          </p>
          <p className="font-bold text-[18px] w-full py-[12px] border-b border-black ">
            Sound room
          </p>
          <p className="font-bold text-[18px] w-full py-[12px] border-b border-black ">
            Internet and printing
          </p>
          <p className="font-bold text-[18px] w-full py-[12px]">Events</p>
        </div>
      </div>
    </div>
  );
};

export default About;
