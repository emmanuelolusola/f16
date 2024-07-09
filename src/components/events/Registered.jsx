import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";
import { bookings } from "../../queries/auth";
import Select from "react-dropdown-select";
import { usePaystackPayment } from "react-paystack";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import check from "../../assets/check.svg";

const Registered = () => {
  const { id } = useParams();

  const location = useLocation();

  const [searchParams] = useSearchParams();

  const [event, setEvent] = useState();

  const [phone, setPhone] = useState(localStorage.getItem("phone") ?? "");

  const [loading, setLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );

  const [selectedTime, setSelectedTime] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(true);

  const [isOpen, setIsOpen] = React.useState(false);

  const [activeButton, setActiveButton] = useState(null);

  const [email, setEmail] = useState(localStorage.getItem("email") ?? "");

  const [name, setName] = useState(localStorage.getItem("name") ?? "");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const dates = useMemo(() => {
    if (!event) return null;
    let starts = moment(event.starts);
    let ends = moment(event.ends);

    if (starts.isSame(ends)) {
      return [starts.format("YYYY-MM-DD")];
    }

    let dates = [];
    while (starts.isSameOrBefore(ends)) {
      dates.push(starts.format("YYYY-MM-DD"));
      starts.add(1, "days");
    }
    return dates;
  }, [event]);

  console.log(event);

  console.log(dates);

  const initializePaystackPayment = usePaystackPayment({
    publicKey: "pk_live_863a585062c21b3fe2176863a41b38f8b6945d0c",
    email,
    amount: (event?.price || 0) * 100,
    currency: "NGN",
    text: "Pay Now",
    onClose: () => console.log("Payment closed"),
    onSuccess: (transaction) => {
      console.log("Payment success", transaction);
      addBooking();
    },
    onCancel: () => console.log("Payment cancelled"),
  });

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setName(inputName);
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);
  };

  useEffect(() => {
    validateEmail(email);
  }, []);

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  }, []);

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    validateEmail(inputValue);
  };

  const addBooking = async () => {
    const data = {
      Email: email,
      Name: name,
      Event: event.name,
      Date: selectedDate,
      Amount: Number(event.price) > 0 ? Number(event.price) : null,
      "Time Slot": event.time,
      "Paid with": event.price > 0 ? "paystack" : null,
      Type: "event",
      "Payment Reference":
        event.price > 0 ? new Date().getTime().toString() : null,
      Phone: phone,
      Venue: event.venue,
    };

    try {
      setLoading(true);
      const res = await bookings(data);
      console.log(res);
      setLoading(false);

      navigate(
        `/event/${id}/registered?email=${email}&name=${event.name}&time=${event.time}&date=${selectedDate}&address=${event.address}&imgUrl=${event.imgUrl}&starts=${event.starts}&ends=${event.ends}&type=${event.type}&rsvp=${event.rsvp}&price=${event.price}&venue=${event.venue}`
      );
      window.location.reload();
    } catch (error) {
      setLoading(false);
      error;
    }
  };

  const handleButtonClick = async () => {
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("phone", phone);
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("phone");
    }
    localStorage.setItem("rememberMe", rememberMe);
    if (event.price > 0) {
      initializePaystackPayment({
        email,
        amount: (event?.price || 0) * 100,
        currency: "NGN",
        onClose: () => console.log("Payment closed"),
        onSuccess: (transaction) => {
          console.log("Payment success", transaction);
          // handle successful payment here
          addBooking();
        },
        onCancel: () => console.log("Payment cancelled"),
      });
    } else {
      addBooking();
    }
  };

  const toggleDrawer = (button) => {
    setIsOpen((prevState) => !prevState);

    setActiveButton(button);
  };

  const emailAddress = "friends@16by16.co";
  const subject = "I didn't get a receipt";
  const body = encodeURIComponent(
    `Hi 16/16,

    I recently made a purchase but haven't received the receipt. Can you please assist me with this?

    Date: ${moment().format("DD/MM/YYYY")}
    Email: ${event?.email}
    Event: ${event?.name}`
  );

  const handleWhatsAppClick = () => {
    const whatsappNumber = "+2348188325714";
    const message = encodeURIComponent(
      `Hi 16/16,

      I recently made a purchase but haven't received the receipt. Can you please assist me with this?

      Date: ${moment().format("DD/MM/YYYY")}
      Email: ${event.email}
      Event: ${event.name}`
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

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setShowConfirmation(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(() => {
    const event = Object.fromEntries(
      new URLSearchParams(location.search).entries()
    );

    if (event) {
      setEvent(event);

      {
        event?.days ? setSelectedDate(event?.days[0] || null) : null;
      }
      {
        event?.times ? setSelectedTime(event?.times[0] || null) : null;
      }
    }
  }, [id]);

  useEffect(() => {
    if (dates?.length) {
      setSelectedDate(dates[0]);
    }
  }, [dates]);

  if (!event) {
    return null;
  }

  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
      {showConfirmation && (
        <div className="animate-alert fixed z-20 top-0 w-full h-[70px] bg-[#0a0a0a] px-[24px] lg:px-[96px] flex justify-between items-center">
          <p className="text-white text-[18px] font-normal">Registered</p>
          <img src={check} alt="" />
        </div>
      )}
      <div className="bg-white fixed justify w-full top-0 px-[24px] lg:px-[96px] pt-[10px] lg:pt-[30px] z-10">
        <div className="w-full flex justify-between items-center mt-[15px]">
          <p
            className="font-normal text-[18px] cursor-pointer"
            onClick={() => navigate(`/`)}
          >
            Back
          </p>
          <Link to="/menu">
            <button className="font-normal text-[18px]">Menu</button>
          </Link>
        </div>
      </div>
      <div className="bg-white sticky justify w-full top-4 pt-[10px] lg:pt-[30px] px-[24px] lg:px-[96px]">
        <div className="w-full lg:w-[600px] lg:mx-auto flex justify-between items-center mt-[50px]">
          <p className="font-bold text-[18px]">{event.name}</p>
        </div>
        <hr className="mt-[20px] opacity-30" />
      </div>
      <div className="px-[24px] lg:w-[600px] lg:px-0 lg:mx-auto flex flex-col gap-[24px] py-[20px]">
        <img src={event.imgUrl} alt="" className="w-full" />
        <p className="text-[18px] font-normal text-center">
          We’ve sent you a receipt at {event.email}
        </p>
        <div className="w-full flex flex-col gap-2">
          {event.rsvp ? (
            <button
              className="w-full h-[66px] border border-[#0a0a0a] text-[#0a0a0a] text-[18px] font-bold"
              onClick={() => toggleDrawer("button1")}
            >
              Get another ticket
            </button>
          ) : (
            <button className="w-full h-[66px] border border-[#e1e1e1] text-[#bebebe] text-[18px] font-bold">
              Sold out
            </button>
          )}
          <button
            className="w-full h-[66px] border border-[#FF3131] text-[#FF3131] text-[18px] font-bold"
            onClick={() => toggleDrawer("button2")}
          >
            I didn't get a receipt
          </button>
        </div>
      </div>
      {window.innerWidth <= 768 ? (
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="bottom"
          className="w-full px-[24px] pt-[26px] pb-[48px] overflow-y-auto"
          size={
            event.start === event.end && activeButton === "button1"
              ? 590
              : event.start !== event.end && activeButton === "button1"
              ? 640
              : 600
          }
        >
          {activeButton === "button1" && (
            <div className="w-full flex flex-col gap-[26px]">
              <p className="text-[18px] font-bold">RSVP</p>
              {dates ? (
                <div className="w-full flex flex-col gap-0">
                  <p className="text-[18px] font-normal">Day</p>
                  <Select
                    placeholder="Select day"
                    options={dates.map((day) => ({
                      value: day,
                      label: getDate(day),
                    }))}
                    onChange={(values) => setSelectedDate(values[0].value)}
                    className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                    color="black"
                    dropdownHeight="220px"
                    contentRenderer={() => {
                      return <div>{getDate(selectedDate)}</div>;
                    }}
                  />
                </div>
              ) : null}
              {event?.times ? (
                <div className="w-full flex flex-col gap-0">
                  <p className="text-[18px] font-normal">Time</p>
                  <Select
                    placeholder="Select time"
                    options={event.times.map((time) => ({
                      value: time,
                      label: time,
                    }))}
                    onChange={(values) => setSelectedTime(values[0].value)}
                    className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                    color="black"
                    contentRenderer={() => {
                      return <div>{selectedTime}</div>;
                    }}
                  />
                </div>
              ) : null}
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
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember-me"
                  className="text-[18px] font-normal"
                >
                  Remember me
                </label>
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
                    loading ||
                    !name ||
                    !phone ||
                    (!event.dates && !isEmailValid)
                  }
                  className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                  onClick={handleButtonClick}
                >
                  {event?.price > 0 ? "Buy Ticket" : "Get Ticket"}
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
              {event?.price ? (
                <p className="flex flex-col text-[18px] font-normal">
                  Date: {moment().format("DD/MM/YYYY")}
                  <br /> Email: {event?.email}
                  <br /> Event: {event?.name}
                </p>
              ) : (
                <p className="flex flex-col text-[18px] font-normal">
                  Date: {moment().format("DD/MM/YYYY")}
                  <br /> Email: {event?.email}
                  <br /> Event: {event?.name}
                </p>
              )}
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
      ) : (
        <Modal open={isOpen} onClose={toggleDrawer} center closeIcon>
          {activeButton === "button1" && (
            <div className="w-[500px] flex flex-col gap-[26px] p-4">
              <p className="text-[18px] font-bold">RSVP</p>
              {dates ? (
                <div className="w-full flex flex-col gap-0">
                  <p className="text-[18px] font-normal">Day</p>
                  <Select
                    placeholder="Select day"
                    options={dates.map((day) => ({
                      value: day,
                      label: day,
                    }))}
                    onChange={(values) => setSelectedDate(values[0].value)}
                    className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                    color="black"
                    dropdownHeight="220px"
                    contentRenderer={() => {
                      return <div>{selectedDate}</div>;
                    }}
                  />
                </div>
              ) : null}
              {event?.times ? (
                <div className="w-full flex flex-col gap-0">
                  <p className="text-[18px] font-normal">Time</p>
                  <Select
                    placeholder="Select time"
                    options={event.times.map((time) => ({
                      value: time,
                      label: time,
                    }))}
                    onChange={(values) => setSelectedTime(values[0].value)}
                    className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                    color="black"
                    contentRenderer={() => {
                      return <div>{selectedTime}</div>;
                    }}
                  />
                </div>
              ) : null}
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
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(!rememberMe)}
                />
                <label
                  htmlFor="remember-me"
                  className="text-[18px] font-normal"
                >
                  Remember me
                </label>
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
                    loading ||
                    !name ||
                    !phone ||
                    (!event.dates && !isEmailValid)
                  }
                  className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                  onClick={handleButtonClick}
                >
                  {event?.price > 0 ? "Buy Ticket" : "Get Ticket"}
                </button>
              )}
            </div>
          )}
          {activeButton === "button2" && (
            <div className="w-[500px] flex flex-col gap-[26px] p-4">
              <p className="text-[18px] text-[#FF3131] font-bold">Support</p>
              <p className="text-[18px] font-normal">Hi 16/16,</p>
              <p className="text-[18px] font-normal">
                I recently made a purchase but haven't received the receipt. Can
                you please assist me with this?
              </p>
              {event?.price ? (
                <p className="flex flex-col text-[18px] font-normal">
                  Date: {moment().format("DD/MM/YYYY")}
                  <br /> Email: {event?.email}
                  <br /> Event: {event?.name}
                </p>
              ) : (
                <p className="flex flex-col text-[18px] font-normal">
                  Date: {moment().format("DD/MM/YYYY")}
                  <br /> Email: {event?.email}
                  <br /> Event: {event?.name}
                </p>
              )}
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
        </Modal>
      )}
    </div>
  );
};

export default Registered;

function getDate(dateString) {
  if (!dateString) return;
  const dateObject = new Date(dateString);
  const todayObject = new Date();
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
