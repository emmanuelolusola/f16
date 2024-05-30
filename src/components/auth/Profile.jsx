import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow_forward_ios.svg";

const Profile = () => {
  const navigate = useNavigate();
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
      <div className="px-[24px] lg:px-[96px] h-[82dvh] grid content-between lg:flex lg:justify-between pb-[0px]">
        <div className="lg:w-[400px] flex flex-col gap-8">
          <div className="w-full flex justify-between items-start">
            <div className="flex gap-2">
              <div className="relative w-[52px] h-[52px] bg-[#d9d9d9] rounded-full">
                <div className="absolute h-[12px] w-[12px] top-1 right-0 bg-[#ff0000] rounded-full"></div>
              </div>
              <div className="flex flex-col gap-0">
                <p className="font-bold text-[18px] lg:text-[24px]">
                  Opemipo Aikomo
                </p>
                <p className="font-normal text-[18px] lg:text-[24px]">
                  Inactive
                </p>
              </div>
            </div>
            <p
              className="font-normal text-[18px] lg:text-[24px] cursor-pointer"
              onClick={() => navigate(`/profile/edit`)}
            >
              Edit
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <p className="w-[30%] font-normal text-[18px] lg:text-[24px]">
                Joined
              </p>
              <p className="font-bold text-[18px] lg:text-[24px]">
                Jun 5, 2024
              </p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-normal text-[18px] lg:text-[24px]">
                Expires
              </p>
              <p className="font-bold text-[18px] lg:text-[24px]">
                Dec 10, 2024
              </p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-normal text-[18px] lg:text-[24px]">
                Phone
              </p>
              <p className="font-bold text-[18px] lg:text-[24px]">
                07087212710
              </p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-normal text-[18px] lg:text-[24px]">
                Email
              </p>
              <p className="font-bold text-[18px] lg:text-[24px]">
                faruqade32@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:items-end">
          <div
            className="lg:w-[200px] flex justify-between items-center cursor-pointer hover:text-[#ff0000]"
            onClick={() => navigate(`/profile/info`)}
          >
            <p className="font-bold text-[18px] lg:text-[24px]">Profile</p>
            <img src={arrow} alt="" />
          </div>
          <div
            className="lg:w-[200px] flex justify-between items-center hover:text-[#ff0000]"
            onClick={() => navigate(`/profile/bookings`)}
          >
            <p className="font-bold text-[18px] lg:text-[24px]">Bookings</p>
            <img src={arrow} alt="" />
          </div>
          <div
            className="lg:w-[200px] flex justify-between items-center hover:text-[#ff0000]"
            onClick={() => navigate(`/profile/payments`)}
          >
            <p className="font-bold text-[18px] lg:text-[24px]">Payment</p>
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
