import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow_forward_ios.svg";
import { BOOKINGS } from "../../utils/constants";

const ProfileBookings = () => {
  const navigate = useNavigate();
  const [expandedBookingId, setExpandedBookingId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedBookingId(expandedBookingId === id ? null : id);
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    const options = { weekday: "long", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    const [weekday, month, year] = formattedDate.split(" ");
    return `${year} ${day}${suffix} ${weekday}, ${month}`;
  };

  const today = new Date();
  const filteredAndSortedBookings = BOOKINGS.filter((booking) => {
    const bookingDate = new Date(booking.day);
    return bookingDate.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
  }).sort((a, b) => new Date(a.day) - new Date(b.day));

  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
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
      <div className="h-[60px] lg:h-[100px]"></div>
      <div className="w-full px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col gap-8 pb-10">
        <div className="flex flex-col gap-2 mt-[20px] lg:mt-[50px]">
          <p className="text-[18px] lg:text-[24px] font-bold ">Bookings</p>
        </div>
        <div className="w-full flex flex-col gap-4">
          {filteredAndSortedBookings.map((booking) => (
            <div key={booking.id} className="w-full border-b border-[#E0E0E0]">
              <div
                className="p-4 flex justify-between items-center"
                onClick={() => toggleExpand(booking.id)}
              >
                <p className="w-full text-[18px] lg:text-[24px] font-bold cursor-pointer">
                  {booking.event}
                </p>
                <img
                  src={arrow}
                  alt="arrow"
                  className={`cursor-pointer transform transition-transform duration-200 ${
                    expandedBookingId === booking.id ? "rotate-90" : ""
                  }`}
                />
              </div>
              {expandedBookingId === booking.id && (
                <div className="px-4 pt-0 pb-4 flex flex-col gap-2">
                  <p className="w-full text-[18px] lg:text-[24px] font-normal ">
                    {formatDate(booking.day)}
                  </p>
                  <p className="w-full text-[18px] lg:text-[24px] font-normal ">
                    {booking.timeslot}
                  </p>
                  <p className="w-full text-[18px] lg:text-[24px] font-normal ">
                    {booking.address}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileBookings;
