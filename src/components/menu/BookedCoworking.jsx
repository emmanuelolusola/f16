import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { coworking } from "../../queries/auth";
import moment from "moment";
import { COWORKING } from "../../utils/constants";
import Drawer from "react-modern-drawer";
import Select from "react-dropdown-select";
import "react-modern-drawer/dist/index.css";

import image from "../../assets/image.png";
import check from "../../assets/check.svg";

const getNextValidCoworkingDay = (date) => {
  const nextDay = moment(date).add(1, "day");
  const dayOfWeek = nextDay.day();
  if (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 1) {
    return getNextValidCoworkingDay(nextDay);
  }
  return nextDay;
};

let today = moment();

if (today.day() === 0 || today.day() === 6 || today.day() === 1) {
  today = getNextValidCoworkingDay(today);
}

const firstCoworkingDay = today;
const secondCoworkingDay = getNextValidCoworkingDay(firstCoworkingDay);

const coworkingDays = [
  firstCoworkingDay.format("MM/DD/YYYY"),
  secondCoworkingDay.format("MM/DD/YYYY"),
];

const BookedCoworking = () => {
  const [showConfirmation, setShowConfirmation] = useState(true);

  const [isOpen, setIsOpen] = React.useState(false);

  const [selectedHour, setSelectedHour] = useState(COWORKING[0].hours[0]);

  const [activeButton, setActiveButton] = useState(null);

  const [selectedDay, setSelectedDay] = useState(coworkingDays[0]);

  const toggleDrawer = (button) => {
    setIsOpen((prevState) => !prevState);

    setActiveButton(button);
  };

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(inputValue));
  };

  const handleTimeChange = (values) => {
    setSelectedHour(values.map((v) => v.value));

    const price = values.length * 75;
    setTotalPrice(price);
  };

  const handleButtonClick = async () => {
    const data = {
      Email: email,
      Name: name,
      Event: "Co-working",
      Date: selectedDay,
      Amount: null,
      "Time Slot": selectedHour,
      "Paid with": null,
      Type: "co-working",
      "Payment Reference": null,
      Phone: phone,
    };
    try {
      setLoading(true);
      const res = await coworking(data);
      console.log(res);
      setLoading(false);

      navigate(
        `/booked-coworking?email=${email}&name=${name}&time=${selectedHour}&day=${selectedDay}&type=${"cowork"}&phone=${phone}`
      );
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      setLoading(false);
      error;
    }
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setShowConfirmation(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  });

  const emailAddress = "friends@16by16.co";
  const subject = "I didn't get a receipt";
  const body = encodeURIComponent(
    `Hi 16/16,

    I recently made a purchase but haven't received the receipt. Can you please assist me with this?

    Email: ${searchParams.get("email")}
    Day:${searchParams.get("day")} Time:${searchParams.get("time")}
    Type: Co-working`
  );

  const handleWhatsAppClick = () => {
    const whatsappNumber = "+2348188325714";
    const message = encodeURIComponent(
      `Hi 16/16,

      I recently made a purchase but haven't received the receipt. Can you please assist me with this?

      Email: ${searchParams.get("email")}
      Day:${searchParams.get("day")} Time:${searchParams.get("time")}
      Type: Co-working`
    );
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailClick = () => {
    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.open(emailUrl, "_blank");
  };

  return (
    <div className="w-full h-[100dvh] lg:h-full py-[10px] lg:py-[20px]">
      {showConfirmation && (
        <div className="animate-alert fixed z-10 top-0 w-full h-[70px] lg:h-[100px] bg-[#0a0a0a] px-[24px] lg:px-[96px] flex justify-between items-center">
          <p className="text-white text-[18px] lg:text-[24px] font-normal">
            Booked
          </p>
          <img src={check} alt="" />
        </div>
      )}
      <div className="bg-white fixed w-full top-0 px-[24px] lg:px-[96px] pt-[10px] lg:pt-[20px]">
        <div className="w-full flex justify-between items-center py-[15px] border-b border-[#0a0a0a10] ">
          <p
            className="font-normal text-[18px] lg:text-[24px]"
            onClick={() => navigate(`/menu`)}
          >
            Back
          </p>
        </div>
      </div>
      <div className="h-[80px] lg:h-[120px]"></div>
      <div className="lg:w-1/2 lg:mx-auto h-[85dvh] lg:h-full px-[24px] lg:px-0 grid grid-col content-between">
        <div className="flex flex-col gap-4 lg:pb-[20px]">
          <p className="text-[18px] lg:text-[24px] font-bold mb-[20px]">
            Co-working at 16
          </p>

          <img src={image} alt="" className="w-full pb-[10px] lg:pb-[20px]" />
          <p className="text-[18px] leading-[32px] lg:text-[24px]">
            We’ve sent you a receipt at {searchParams.get("email")}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            className="w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] lg:text-[24px] font-bold"
            onClick={() => toggleDrawer("button1")}
          >
            Book again
          </button>
          <button
            className="w-full h-[66px] border border-[#FF3131] text-[#FF3131] text-[18px] font-bold"
            onClick={() => toggleDrawer("button2")}
          >
            I didn't get a receipt
          </button>
        </div>
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        direction="bottom"
        className="w-full px-[24px] pt-[26px] pb-[48px] overflow-y-auto"
        size={activeButton === "button1" ? 640 : 560}
      >
        {activeButton === "button1" && (
          <div className="w-full flex flex-col gap-[26px]">
            <p className="text-[18px] font-bold">Book co-working</p>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Day</p>
              <div className="flex items-center gap-1">
                {coworkingDays.map((day) => (
                  <button
                    key={day}
                    className={`px-[12px] py-[10px] border w-full h-[56px] text-[#0A0A0A] ${
                      day === selectedDay
                        ? "border-2 border-[#0a0a0a] text-[20px]"
                        : "border-[#0a0a0a50] text-[18px]"
                    }`}
                    onClick={() => setSelectedDay(day)}
                  >
                    {getDate(day)}
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Time</p>
              <Select
                placeholder="Select time"
                options={COWORKING[0].hours.map((time) => ({
                  value: time,
                  label: time,
                }))}
                onChange={(values) => setSelectedHour(values[0].value)}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                color="black"
                contentRenderer={() => {
                  return <div>{[selectedHour]}</div>;
                }}
              />
            </div>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Name</p>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleNameChange}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
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
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Phone Number</p>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {loading ? (
              <button
                disabled
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Please wait
              </button>
            ) : (
              <button
                disabled={
                  !isEmailValid || !name || !selectedDay || !selectedHour
                }
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Book
              </button>
            )}
          </div>
        )}
        {activeButton === "button2" && (
          <div className="w-full flex flex-col gap-[26px]">
            <p className="text-[18px] text-[#FF3131] font-bold">Support</p>
            <p className="text-[18px] font-normal">Hi 16/16,</p>
            <p className="text-[18px] font-normal">
              I recently made a purchase but haven't received the receipt. Can
              you please assist me with this?
            </p>
            <p className="flex flex-col text-[18px] font-normal">
              Email: {searchParams.get("email")}
              <br /> Day: {searchParams.get("day")}
              {"  "} Time:
              {searchParams.get("time")}
              <br /> Type: Co-working
            </p>
            <div className="flex flex-col gap-4">
              <button
                className="w-full h-[74px] text-[18px] font-bold border border-black text-black"
                onClick={handleWhatsAppClick}
              >
                Send on WhatsApp
              </button>
              <button
                className="w-full h-[74px] text-[18px] font-bold border border-black text-black"
                onClick={handleEmailClick}
              >
                Send Via Email
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default BookedCoworking;

function getDate(dateString) {
  if (!dateString) return;
  const dateObject = new Date(dateString);
  const todayObject = new Date();
  const tomorrowObject = new Date(todayObject);
  tomorrowObject.setDate(tomorrowObject.getDate() + 1);
  const dayIndex = dateObject.getDay();
  const date = dateObject.getDate();
  const monthIndex = dateObject.getMonth();
  const month = MONTHS[monthIndex];
  const day = DAYS[dayIndex];
  if (
    date === todayObject.getDate() &&
    monthIndex === todayObject.getMonth() &&
    dateObject.getFullYear() === todayObject.getFullYear()
  ) {
    return "Today";
  } else if (
    date === tomorrowObject.getDate() &&
    monthIndex === tomorrowObject.getMonth() &&
    dateObject.getFullYear() === tomorrowObject.getFullYear()
  ) {
    return "Tomorrow";
  }

  return `${day}, ${month} ${date}`;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
