import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { coworking, bookCoworking } from "../../queries/auth";
import moment from "moment";

import { COWORKING } from "../../utils/constants";
import Drawer from "react-modern-drawer";
import Select from "react-dropdown-select";
import "react-modern-drawer/dist/index.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import image from "../../assets/image.png";

const getNextValidCoworkingDay = (date) => {
  const nextDay = moment(date).add(1, "day");
  const dayOfWeek = nextDay.day();
  if (dayOfWeek === 1) {
    return getNextValidCoworkingDay(nextDay);
  }
  return nextDay;
};

let today = moment();

if (today.day() === 1) {
  today = getNextValidCoworkingDay(today);
}

const firstCoworkingDay = today;
const secondCoworkingDay = getNextValidCoworkingDay(firstCoworkingDay);

const coworkingDays = [
  firstCoworkingDay.format("MM/DD/YYYY"),
  secondCoworkingDay.format("MM/DD/YYYY"),
];

const Coworking = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedHour, setSelectedHour] = useState(COWORKING[0].hours[0]);
  const [selectedDay, setSelectedDay] = useState(coworkingDays[0]);
  const [coworkingData, setCoworkingData] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoworkingData = async () => {
      try {
        setLoader(true);
        const res = await bookCoworking();
        setCoworkingData(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchCoworkingData();
  }, []);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

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
      Email: localStorage.getItem("userID")
        ? localStorage.getItem("userEmail")
        : email,
      Name: localStorage.getItem("userID")
        ? localStorage.getItem("userName")
        : name,
      Event: "Co-working",
      Date: selectedDay,
      Amount: null,
      "Time Slot": selectedHour,
      "Paid with": null,
      Type: "co-working",
      "Payment Reference": null,
      Phone: localStorage.getItem("userID")
        ? localStorage.getItem("userNumber")
        : phone,
    };
    try {
      setLoading(true);
      const res = await coworking(data);
      console.log(res);
      setLoading(false);

      if (localStorage.getItem("userID")) {
        navigate(`/profile/bookings`);
      } else {
        navigate(
          `/booked-coworking?email=${email}&name=${name}&time=${selectedHour}&day=${selectedDay}&type=${"coworking"}&phone=${phone}`
        );
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const isCoworkingAvailable = coworkingData.some(
    (space) => space.Coworking !== null
  );

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
          onClick={() => navigate(`/menu`)}
        >
          Menu
        </p>
      </div>
      <div className="h-[60px] lg:h-[80px]"></div>
      {loader ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <div
            className="w-8 h-8 border-4 border-t-4 border-black rounded-full animate-spin"
            style={{
              borderTopColor: "transparent",
            }}
          ></div>
        </div>
      ) : (
        <div className="h-full px-[24px] lg:px-0 lg:w-[600px] lg:mx-auto grid grid-col content-between gap-4 lg:gap-8">
          <div className="flex flex-col gap-4">
            <p className="text-[18px] font-bold">Book a Spot</p>
            <img src={image} alt="" className="w-full pb-0" />
            <div className="w-full flex flex-col">
              <p className="font-normal text-[18px] w-full py-[10px] border-b border-black ">
                What's included
              </p>
              <p className="font-bold text-[18px] w-full py-[10px] border-b border-black ">
                Communal seating
              </p>
              <p className="font-bold text-[18px] w-full py-[10px] border-b border-black ">
                Extra high stools by the bar
              </p>
              <p className="font-bold text-[18px] w-full py-[10px] border-b border-black ">
                Internet access
              </p>
              <p className="font-bold text-[18px] w-full py-[10px] border-b border-black ">
                The bar
              </p>
              <p className="font-bold text-[18px] w-full py-[10px]">
                Global network of creatives
              </p>
            </div>
          </div>

          {!isCoworkingAvailable ? (
            <button
              className="w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] font-bold mb-[20px] disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
              onClick={toggleDrawer}
              disabled
            >
              Not available
            </button>
          ) : (
            <button
              className="w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] font-bold mb-[20px] disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
              onClick={toggleDrawer}
            >
              Book
            </button>
          )}
        </div>
      )}
      {window.innerWidth <= 768 ? (
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="bottom"
          className="w-full px-[24px] pt-[26px] pb-[48px] overflow-y-auto"
          size={420}
        >
          <div className="w-full flex flex-col gap-[26px]">
            <p className="text-[18px] font-bold">Book Now</p>
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
            {!localStorage.getItem("userID") && (
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
            )}
            {!localStorage.getItem("userID") && (
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
            )}
            {!localStorage.getItem("userID") && (
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
            )}
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
                disabled={!selectedDay || !selectedHour}
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Book
              </button>
            )}
          </div>
        </Drawer>
      ) : (
        <Modal open={isOpen} onClose={toggleDrawer} center closeIcon>
          <div className="w-[700px] flex flex-col gap-[26px] p-8">
            <p className="text-[18px] font-bold">Book Now</p>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Day</p>
              <div className="flex items-center gap-4">
                {coworkingDays.map((day) => (
                  <button
                    key={day}
                    className={`px-[12px] py-[10px] border w-full h-[64px] text-[#0A0A0A] ${
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
                className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                color="black"
                contentRenderer={() => {
                  return <div>{[selectedHour]}</div>;
                }}
              />
            </div>
            {!localStorage.getItem("userID") && (
              <div className="w-full flex flex-col gap-0">
                <p className="text-[18px] font-normal">Name</p>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
                />
              </div>
            )}
            {!localStorage.getItem("userID") && (
              <div className="w-full flex flex-col gap-0">
                <p className="text-[18px] font-normal">Email Address</p>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
                />
              </div>
            )}
            {!localStorage.getItem("userID") && (
              <div className="w-full flex flex-col gap-0">
                <p className="text-[18px] font-normal">Phone Number</p>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
                />
              </div>
            )}
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
                disabled={!selectedDay || !selectedHour}
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Book
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Coworking;

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
