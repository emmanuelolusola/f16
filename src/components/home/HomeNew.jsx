import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { events } from "../../queries/auth";
import HomeLanding from "./HomeLanding";
import moment from "moment";

const HomeNew = () => {
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState("");

  const navigate = useNavigate();

  const currentMoment = moment(moment().format("YYYY-MM-DD"));

  function getDefaultDate() {
    const event = eventsList[0];
    if (event) {
      const StartDate = getDate(event.StartDate);
      const EndDate = getDate(event.EndDate);
      if (StartDate === EndDate) {
        setCurrentTitle(StartDate);
      } else setCurrentTitle(`${StartDate} - ${EndDate}`);
    }
  }

  useEffect(() => {
    const fetchData = async (data) => {
      try {
        setLoading(true);
        const res = await events(data);
        setEventsList(res);
        console.log(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getDefaultDate();
  }, [eventsList]);

  useEffect(() => {
    const handleScroll = () => {
      const elements = eventsList.map((item, index) => {
        const element = document.getElementById(item.ID);
        const rect = element.getBoundingClientRect();
        return {
          index,
          inView: rect.top >= 0 && rect.bottom <= window.innerHeight,
        };
      });

      const inViewElement = elements.find((item) => item.inView);

      if (inViewElement !== undefined) {
        setActiveIndex(inViewElement.index);
        const StartDate = getDate(eventsList[inViewElement.index].StartDate);
        const EndDate = getDate(eventsList[inViewElement.index].EndDate);
        if (StartDate === EndDate) {
          setCurrentTitle(StartDate);
        } else setCurrentTitle(`${StartDate} - ${EndDate}`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [eventsList]);

  const sortedEventsList = eventsList.sort((a, b) => {
    const aStartDate = new Date(a.StartDate);
    const bStartDate = new Date(b.StartDate);
    const aEndDate = new Date(a.EndDate);
    const bEndDate = new Date(b.EndDate);

    if (currentMoment.isSame(aStartDate, "day")) return -1;
    if (currentMoment.isSame(bStartDate, "day")) return 1;

    if (
      currentMoment.isBefore(aStartDate) &&
      currentMoment.isBefore(bStartDate)
    ) {
      return aStartDate - bStartDate;
    }

    if (
      currentMoment.isBefore(aStartDate) &&
      currentMoment.isBetween(aStartDate, aEndDate)
    )
      return -1;
    if (
      currentMoment.isBefore(bStartDate) &&
      currentMoment.isBetween(bStartDate, bEndDate)
    )
      return 1;

    return aStartDate - bStartDate;
  });

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  const userID = localStorage.getItem("userID");

  return (
    <div className="w-full">
      <div
        className="hidden md:flex h-[66px] w-full bg-[#0a0a0a] justify-between items-center px-[24px] lg:px-[96px] cursor-pointer"
        onClick={() => {
          navigate(`/membership`);
          scrollToTop();
        }}
      >
        <p className="font-normal text-[18px] text-white">Memberships open</p>
        <p className="font-normal text-[18px] text-white">Apply</p>
      </div>
      <div className="w-full h-full py-[10px] lg:py-[10px]">
        <div className="w-full fixed md:sticky top-0  flex justify-between items-center py-[15px] lg:pb-0 lg:py-[20px] px-[24px] lg:px-[96px] bg-white z-10">
          <p
            className="font-bold text-[18px] cursor-pointer"
            onClick={() => {
              navigate(`/`);
              scrollToTop();
            }}
          >
            16/16
          </p>
          <Link to="/menu">
            <button className="font-normal text-[18px]">Menu</button>
          </Link>
        </div>
        <HomeLanding />
        <div
          className="sm:hidden h-[66px] w-full bg-[#0a0a0a] fixed bottom-0 lg:top-0 z-50 flex justify-between items-center px-[24px] lg:px-[96px] cursor-pointer"
          onClick={() => {
            navigate(`/membership`);
            scrollToTop();
          }}
        >
          <p className="font-normal text-[18px] text-white">Memberships open</p>
          <p className="font-normal text-[18px] text-white">Apply</p>
        </div>

        <div className="bg-white sticky justify-center w-full top-4 pt-[10px] lg:pt-[5px] px-[24px] lg:px-[96px]">
          <div className="w-full flex justify-between items-center mt-[40px]">
            <p className="font-bold text-[18px]">Calendar</p>
            <p className="font-normal text-[18px]">{currentTitle}</p>
          </div>
          <hr className="mt-[20px] opacity-30" />
        </div>

        <div className="pb-[50px]">
          {loading ? (
            <div className="w-full text-center p-[40px]">
              <div className="font-normal text-[18px]">Loading...</div>
            </div>
          ) : eventsList.length === 0 ? (
            <div className="w-full text-center p-[40px]">
              <div className="font-normal text-[18px]">No events available</div>
            </div>
          ) : (
            sortedEventsList.map((event, index) => {
              if (event["Members-only"] && !userID) {
                return null;
              }

              return (
                <div
                  className="mt-[30px] lg:mt-[60px] lg:w-[600px] px-[24px] lg:px-0 flex flex-col gap-4 lg:gap-4 pb-[20px] lg:pb-0 lg:mx-auto"
                  key={index}
                  id={event.ID}
                >
                  <p className="font-bold text-[18px]">{event.Name}</p>
                  <img
                    src={event.Poster[0].url}
                    alt=""
                    onClick={() => navigate(`/event/${event.ID}`)}
                    className="cursor-pointer"
                  />
                  {currentMoment.isSameOrBefore(event.EndDate)}
                  {event.RSVP === true &&
                  currentMoment.isSameOrBefore(event.EndDate) ? (
                    <NavLink
                      to={{ pathname: `/event/${event.ID}` }}
                      state={event}
                      className="w-full h-[66px] border border-[#0a0a0a] bg-white text-[#0A0A0A] text-[18px] font-bold flex justify-center items-center"
                    >
                      RSVP
                    </NavLink>
                  ) : currentMoment.isAfter(event.EndDate) ? (
                    <div className="w-full h-[66px] border border-[#FF3131] text-[#FF3131] text-[18px] font-bold flex justify-center items-center">
                      Closed
                    </div>
                  ) : (
                    <div className="w-full h-[66px] border border-[#e1e1e1] text-[#bebebe] text-[18px] font-bold flex justify-center items-center">
                      Sold out
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeNew;

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
  return `${month} ${date}`;
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
