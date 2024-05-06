import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import Select from "react-dropdown-select";
import "react-modern-drawer/dist/index.css";

import check from "../../assets/check.svg";

const MailingList = () => {
  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [isOpen, setIsOpen] = React.useState(false);

  const [activeButton, setActiveButton] = useState(null);

  const [email, setEmail] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const toggleDrawer = (button) => {
    setIsOpen((prevState) => !prevState);

    setActiveButton(button);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(inputValue));
  };

  const handleButtonClick = () => {
    if (isEmailValid) {
      navigate(`/membership-program?email=${email}`);
      setIsOpen(false);

      setShowConfirmation(true);
      setTimeout(() => {
        window.location.reload();
      }, 6000);
    }
  };

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setShowConfirmation(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className="w-full h-full py-[10px]">
      {showConfirmation && (
        <div className="animate-alert fixed z-10 top-0 w-full h-[70px] bg-[#0a0a0a] px-[24px] flex justify-between items-center">
          <p className="text-white text-[18px] font-normal">Subscribed</p>
          <img src={check} alt="" />
        </div>
      )}
      <div className="bg-white fixed w-full top-0 px-[24px] pt-[10px]">
        <div className="w-full flex justify-between items-center mt-[15px]">
          <p className="font-normal text-[18px]" onClick={() => navigate(`/`)}>
            Back
          </p>
        </div>
        <hr className="mt-[20px] opacity-30" />
      </div>
      <div className="h-[100px]"></div>
      <div className="px-[24px] flex flex-col gap-8">
        <div className="w-full flex flex-col gap-0">
          <p className="text-[18px] font-bold text-[#0a0a0a]">Friends of 16</p>
          <p className="text-[18px] leading-[32px]">
            Expand your horizon with a universe designed for creatives
          </p>
        </div>
        <div className="w-full flex flex-col">
          <p className="font-bold text-[18px] w-full py-[12px] border-b border-black ">
            Curated program of events, exhibitions, and dinners
          </p>
          <p className="font-bold text-[18px] w-full py-[12px] border-b border-black ">
            Exclusive rates and discounts on hotel accommodation
          </p>
          <p className="font-bold text-[18px] w-full py-[12px] border-b border-black ">
            Preferential access to co-working space and bar
          </p>
          <p className="font-bold text-[18px] w-full py-[12px]">
            Access to our global network of Friends, events and spaces
          </p>
        </div>
        <p className="text-[18px] leading-[32px]">
          Launching in April 2024. Join our mailing list to get notified.
        </p>
        <button
          className="w-full h-[66px] bg-[#ffffff] text-[#0a0a0a] border border-[#0a0a0a] text-[18px] font-bold mb-[36px]"
          onClick={toggleDrawer}
        >
          Join our mailing list
        </button>
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="bottom"
        className="w-full px-[24px] pt-[26px] pb-[48px] overflow-y-auto"
        size={330}
      >
        <div className="w-full h-full flex flex-col gap-8">
          <p className="text-[18px] font-bold">Join our mailing list</p>
          <div className="w-full flex flex-col gap-0">
            <p className="text-[18px] font-normal">Email Address</p>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
            />
          </div>
          <button
            disabled={!isEmailValid}
            className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
            onClick={handleButtonClick}
          >
            Subscribe
          </button>
        </div>
      </Drawer>
    </div>
  );
};

export default MailingList;
