import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow_forward_ios.svg";

const Tour = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  const tips = [
    {
      id: 1,
      text: "Use “Edit” to quickly change information like your name and phone number. You can also add a profile picture to your profile",
      highlight: "edit",
    },
    {
      id: 2,
      text: "“Profile” lets you see all the details submitted during your application",
      highlight: "profile",
    },
    {
      id: 3,
      text: "“Bookings” shows the upcoming events you have registered for",
      highlight: "bookings",
    },
    {
      id: 4,
      text: "Go to “Payments” to see your membership plan and card details",
      highlight: "payments",
    },
  ];

  const [currentTip, setCurrentTip] = useState(0);

  const handleNext = () => {
    if (currentTip < tips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      navigate("/profile/payment");
      scrollToTop();
    }
  };

  const handlePrevious = () => {
    if (currentTip > 0) {
      setCurrentTip(currentTip - 1);
    }
  };

  const highlightClass = (section) => {
    return tips[currentTip].highlight === section
      ? "relative z-50 bg-white px-8 py-4 faded-in"
      : "opacity-100";
  };

  const overlayClass = (section) => {
    return tips[currentTip].highlight === section
      ? ""
      : "fixed inset-0 bg-black bg-opacity-50 z-40";
  };

  return (
    <div className="relative w-full h-[100dvh] py-[10px] lg:py-[20px]">
      {currentTip < tips.length && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-40"></div>
      )}
      <div className="bg-white fixed w-full top-0 px-[24px] lg:px-[96px] pt-[10px] z-30">
        <div className="w-full flex justify-between items-center mt-[15px]">
          <p
            className="font-bold text-[18px] lg:text-[24px] cursor-pointer"
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
        <div className={`lg:w-[400px] flex flex-col gap-8`}>
          <div className="w-full flex justify-between items-start">
            <div className="flex gap-2">
              <div className="relative w-[52px] h-[52px] bg-[#d9d9d9] rounded-full">
                <div className="absolute h-[12px] w-[12px] top-1 right-0 bg-[#ff0000] rounded-full"></div>
              </div>
              <div className="flex flex-col gap-0">
                <p className="font-bold text-[18px] lg:text-[24px]">John Doe</p>
                <p className="font-normal text-[18px] lg:text-[24px]">
                  Inactive
                </p>
              </div>
            </div>
            <button
              className={`font-normal text-[18px] lg:text-[24px] cursor-pointer ${highlightClass(
                "edit"
              )}`}
              onClick={() => navigate(`/profile/edit`)}
              disabled
            >
              Edit
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <p className="w-[30%] font-normal text-[18px] lg:text-[24px]">
                Joined
              </p>
              <p className="font-bold text-[18px] lg:text-[24px]">
                Jun X, 20XX
              </p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-normal text-[18px] lg:text-[24px]">
                Expires
              </p>
              <p className="font-bold text-[18px] lg:text-[24px]">
                Dec XX, 20XX{" "}
              </p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-normal text-[18px] lg:text-[24px]">
                Phone
              </p>
              <p className="font-bold text-[18px] lg:text-[24px]">
                070XXXXXXXX
              </p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-normal text-[18px] lg:text-[24px]">
                Email
              </p>
              <p className="font-bold text-[18px] lg:text-[24px]">
                ****@gmail.com
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:items-end">
          <div
            className={`lg:w-[200px] flex justify-between items-center cursor-pointer ${highlightClass(
              "profile"
            )}`}
            // onClick={() => navigate(`/profile/info`)}
          >
            <p className="font-bold text-[18px] lg:text-[24px]">Profile</p>
            <img src={arrow} alt="" />
          </div>
          <div
            className={`lg:w-[200px] flex justify-between items-center cursor-pointer ${highlightClass(
              "bookings"
            )}`}
            // onClick={() => navigate(`/profile/bookings`)}
          >
            <p className="font-bold text-[18px] lg:text-[24px]">Bookings</p>
            <img src={arrow} alt="" />
          </div>
          <div
            className={`lg:w-[200px] flex justify-between items-center cursor-pointer ${highlightClass(
              "payments"
            )}`}
            // onClick={() => navigate(`/profile/payments`)}
          >
            <p className="font-bold text-[18px] lg:text-[24px]">Payment</p>
            <img src={arrow} alt="" />
          </div>
        </div>
      </div>
      {currentTip < tips.length && (
        <div className="w-full lg:w-[600px] lg:mx-auto fixed inset-0 flex flex-col justify-center items-center z-40 text-white text-center px-[24px] lg:px-0">
          <p className="mb-4 text-[18px] lg:text-[24px]">
            {tips[currentTip].text}
          </p>
          <div className="flex gap-4">
            <button
              className="font-normal text-[18px] lg:text-[24px] bg-white text-black px-8 py-2 rounded disabled:bg-transparent disabled:text-white"
              onClick={handlePrevious}
              disabled={currentTip === 0}
            >
              Previous
            </button>
            <button
              className="font-normal text-[18px] lg:text-[24px] bg-white text-black px-8 py-2 rounded"
              onClick={handleNext}
            >
              {currentTip === tips.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tour;
