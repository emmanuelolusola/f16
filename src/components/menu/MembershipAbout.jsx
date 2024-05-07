import React from "react";
import { useNavigate } from "react-router-dom";

import arrow from "../../assets/chevron-down.svg";
import img from "../../assets/img6.png";

const MembershipAbout = () => {
  const navigate = useNavigate();

  const emailAddress = "friends@16by16.co";
  const subject = "[Subject here]";
  const body = encodeURIComponent(`Hi 16/16,`);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.open(emailUrl, "_blank");
  };

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
        <div className="w-full overflow-hidden">
          <img src={img} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col gap-8 px-[24px] lg:w-[600px] lg:mx-auto lg:px-0 pb-[100px] lg:pb-[100px]">
        <p className="font-normal text-[18px] lg:text-[24px]">
          Becoming a Friend of 16 goes beyond gaining access to a physical space
          - it gives you the opportunity to fully immerse yourself in a universe
          designed and catered to creatives, offering you a chance to expand
          your horizons.
        </p>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-[18px] lg:text-[24px]">
            Here’s what to expect:
          </p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            1. During the week, preferential access (via our dedicated app) to
            our co-working space, which adapts to your needs throughout the day.
          </p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            2. On weekends, preferential access to our #OpenWeekend format and
            the 16/16 bar program for you and your friends.
          </p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            3. Friends-only invitations to our curated programming from across
            our ever-expanding network. This includes exhibitions, dinners,
            talks, pop ups and other activities driven by our incubator.
          </p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            4. Access to Friends-based programming: get a space for a day to
            share your craft, host a dinner, run a workshop or meet new people.
          </p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            5. Exclusive discounts on room bookings.
          </p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            6. Access to our reading library, maker-space and the growing
            network of creative businesses that are part of our network.
          </p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            7. Access to our creative incubator services run by Tushar
            Hathiramani.
          </p>
        </div>
        <p className="font-normal text-[18px] lg:text-[24px]">
          We’ve developed an application with our friends at Wuruwuru Studios
          for Friends of 16 to apply and, once accepted, book co-working seats,
          pay bills and RSVP to events on our programming calendar.
        </p>
        <p className="font-normal text-[18px] lg:text-[24px]">
          To start your journey with us, click on the button below.
        </p>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-[18px] lg:text-[24px]">INTAKES</p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            Intake is on a rolling basis in 2024 and will move to staggered
            intake periods in 2025.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-[18px] lg:text-[24px]">RATES</p>
          <p className="font-normal text-[18px] lg:text-[24px]">
            $250 for one year. <br />
            $150 for 6 months.
          </p>
        </div>
        <p className="font-normal text-[18px] lg:text-[24px]">
          Have any questions? <br />
          Email us at{" "}
          <span onClick={handleEmailClick} className="underline">
            friends@16by16.co
          </span>
        </p>
      </div>
      <div className="px-[24px] lg:px-0 fixed w-full bottom-0 mb-4">
        <div
          className="w-full lg:w-[600px] lg:mx-auto h-[66px] bg-[#0a0a0a] text-white text-[18px] lg:text-[24px] font-bold flex justify-center items-center"
          onClick={() => {
            navigate(`/membership/application`);
            scrollToTop();
          }}
        >
          Apply for membership
        </div>
      </div>
    </div>
  );
};

export default MembershipAbout;
