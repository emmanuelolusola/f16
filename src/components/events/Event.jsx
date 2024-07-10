import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";
import Drawer from "react-modern-drawer";
import Select from "react-dropdown-select";
import "react-modern-drawer/dist/index.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { bookings, getEvent } from "../../queries/auth";
import { usePaystackPayment } from "react-paystack";

const Event = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const { id } = useParams();

  const currentMoment = moment(moment().format("YYYY-MM-DD"));

  const [event, setEvent] = useState();

  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem("email") ?? "");
  const [name, setName] = useState(localStorage.getItem("name") ?? "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") ?? "");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [loading, setLoading] = useState(false);

  const [rememberMe, setRememberMe] = useState(
    localStorage.getItem("rememberMe") === "true"
  );

  const location = useLocation();

  const share = useCallback(
    (title, url) => {
      try {
        if (navigator.canShare) {
          navigator.share({
            title: title || "Default Title",
            url: url || "https://example.com",
          });
        } else {
          console.error("Web Share API not supported");
        }
      } catch (error) {
        console.log(error);
      }
    },
    [navigator.canShare]
  );

  const dates = useMemo(() => {
    if (!event) return null;

    let start = moment(event.StartDate);
    let end = moment(event.EndDate);

    if (start.isSame(end)) {
      return [start.format("YYYY-MM-DD")];
    }

    let dates = [];
    while (start.isSameOrBefore(end)) {
      dates.push(start.format("YYYY-MM-DD"));
      start.add(1, "days");
    }
    return dates;
  }, [event]);

  const transactionConfig = {
    publicKey: "pk_live_93613975cae618d43662167ee9c54cf063bdd6ed",
    email,
    amount: (event?.Price || 0) * 100,
    currency: "NGN",
    text: "Pay Now",
    onClose: () => console.log("Payment closed"),
    onSuccess: (transaction) => {
      console.log("Payment success", transaction);
      // handle successful payment here
      addBooking(transaction.reference);
    },
    onCancel: () => console.log("Payment cancelled"),
  };

  const collectPayment = usePaystackPayment(transactionConfig);

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

  useEffect(() => {
    const fetchData = async (data) => {
      try {
        const res = await getEvent(id);
        setEvent(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const event = location.state;
    setEvent(event);

    if (event) {
      setEvent(event);

      {
        event?.days ? setSelectedDate(event?.days[0] || null) : null;
      }
      {
        event?.times ? setSelectedTime(event?.times[0] || null) : null;
      }
    }
  }, [props, id]);

  useEffect(() => {
    if (dates?.length) {
      setSelectedDate(dates[0]);
    }
  }, [dates]);

  if (!event) {
    return null;
  }

  const addBooking = async (paymentReference) => {
    const data = {
      Email: localStorage.getItem("userID")
        ? localStorage.getItem("userEmail")
        : email,
      Name: localStorage.getItem("userID")
        ? localStorage.getItem("userName")
        : name,
      Event: event.Name,
      Date: selectedDate,
      Amount: event.Price > 0 ? event.Price : null,
      "Time Slot": event.TimeSlots,
      "Paid with": event.Price > 0 ? "paystack" : null,
      Type: "event",
      "Payment Reference": paymentReference,
      Phone: localStorage.getItem("userID")
        ? localStorage.getItem("userNumber")
        : phone,
      Venue: event.Address,
    };

    try {
      setLoading(true);
      const res = await bookings(data);
      console.log(res);
      setLoading(false);

      if (localStorage.getItem("userID")) {
        navigate(`/profile/bookings`);
      } else {
        navigate(
          `/event/${event.ID}/registered?email=${email}&name=${
            event.Name
          }&time=${event.TimeSlots}&date=${selectedDate}&address=${
            event.Address
          }&imgUrl=${event.Poster[0].url}&starts=${event.StartDate}&ends=${
            event.EndDate
          }&type=${"event"}&rsvp=${event.RSVP}&price=${event.Price}&venue=${
            event.Address
          }`
        );
      }
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
    if (event.Price > 0) {
      collectPayment(transactionConfig);
    } else {
      addBooking();
    }
  };

  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
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
          <p className="font-bold text-[18px]">{event.Name}</p>
        </div>
        <hr className="mt-[20px] opacity-30" />
      </div>

      <div className="flex flex-col gap-[24px] bg-white px-[24px] lg:px-0 py-[20px] lg:w-[600px] lg:mx-auto">
        {event?.Poster ? (
          <img src={event.Poster[0].url} alt="" className="w-full" />
        ) : null}
        <div className="flex flex-col gap-4">
          {currentMoment.isSameOrBefore(event.EndDate) ? (
            <button
              className="w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] font-bold"
              onClick={toggleDrawer}
            >
              {event?.Price > 0 ? "Buy Ticket" : "Get Ticket"}
            </button>
          ) : currentMoment.isAfter(event.EndDate) ? (
            <button className="link-no-highlight w-full h-[66px] bg-[#e1e1e1] text-[#FF3131] text-[18px] font-bold">
              Closed
            </button>
          ) : (
            <button className="link-no-highlight w-full h-[66px] bg-[#e1e1e1] text-[#bebebe] text-[18px] font-bold">
              Sold out
            </button>
          )}
          {/* share */}
          {event?.RSVP === true &&
          currentMoment.isSameOrBefore(event.EndDate) ? (
            <button
              className="w-full h-[64px] border border-[#0a0a0a] text-[#0a0a0a] text-[18px] font-bold"
              onClick={() => share(event.Name, event.URL)}
              title={event.Name}
              url={event.URL}
            >
              Share
            </button>
          ) : (
            <button
              className="link-no-highlight w-full h-[66px] border border-[#e1e1e1] text-[#bebebe] text-[18px] font-bold hidden"
              disabled
            >
              Share
            </button>
          )}
        </div>

        {event?.About ? (
          <div className="flex flex-col gap-[8px]">
            <p className="font-normal text-[18px]">{event.About}</p>
          </div>
        ) : null}
        {event?.Price > 0 ? (
          <div className="flex flex-col gap-[8px]">
            <p className="font-normal text-[18px]">Price</p>
            <p className="font-bold text-[18px]">₦{event.Price}</p>
          </div>
        ) : null}
        <div className="flex flex-col gap-[8px]">
          <p className="font-normal text-[18px]">Date</p>
          {event?.StartDate ? (
            <p className="font-bold text-[18px]">{getDate(event.StartDate)}</p>
          ) : null}
          {event?.EndDate && event?.EndDate !== event?.StartDate ? (
            <p className="font-bold text-[18px]">{getDate(event.EndDate)}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-normal text-[18px]">Time</p>
          {event?.TimeSlots ? (
            <p className="font-bold text-[18px]">{event.TimeSlots}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-[8px]">
          <p className="font-normal text-[18px]">Venue</p>
          <p className="font-bold text-[18px]">{event.Address}</p>
        </div>
      </div>
      {window.innerWidth <= 768 ? (
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="bottom"
          className="w-full px-[24px] pt-[26px] pb-[48px] overflow-y-auto"
          size={localStorage.getItem("userID") ? 310 : 620}
        >
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
            {!localStorage.getItem("userID") && (
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
            )}
            {loading ? (
              <button
                disabled
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Please wait
              </button>
            ) : localStorage.getItem("userID") ? (
              <button
                disabled={loading}
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                {event?.Price > 0 ? "Buy Ticket" : "Get Ticket"}
              </button>
            ) : (
              <button
                disabled={
                  loading || !name || !phone || (!event.dates && !isEmailValid)
                }
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                {event?.Price > 0 ? "Buy Ticket" : "Get Ticket"}
              </button>
            )}
          </div>
        </Drawer>
      ) : (
        <Modal open={isOpen} onClose={toggleDrawer} center closeIcon>
          <div className="w-[500px] flex flex-col gap-[26px] p-4">
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
            {!localStorage.getItem("userID") && (
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
            )}
            {loading ? (
              <button
                disabled
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                Please wait
              </button>
            ) : localStorage.getItem("userID") ? (
              <button
                disabled={loading}
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                {event?.Price > 0 ? "Buy Ticket" : "Get Ticket"}
              </button>
            ) : (
              <button
                disabled={
                  loading || !name || !phone || (!event.dates && !isEmailValid)
                }
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                onClick={handleButtonClick}
              >
                {event?.Price > 0 ? "Buy Ticket" : "Get Ticket"}
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Event;

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
