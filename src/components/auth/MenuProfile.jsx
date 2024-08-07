import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

import arrowUp from "../../assets/arrowUp.svg";
import arrow from "../../assets/arrow_forward_ios.svg";

const MenuProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("Inactive");

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const emailAddress = "friends@16by16.co";
  const subject = "[Subject here]";
  const body = encodeURIComponent(`Hi 16/16,`);

  const handleWhatsAppClick = () => {
    const whatsappNumber = "+2348188325714";
    const message = encodeURIComponent(`Hi 16/16,`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailClick = () => {
    const emailUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.open(emailUrl, "_blank");
  };

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userID");
      if (userId) {
        try {
          setLoading(true);
          const response = await fetch(
            `https://friendsof16api.up.railway.app/api/accounts/profile/${userId}`
          );
          const data = await response.json();
          if (data.status === "success") {
            setUserData(data.account);
          }

          // Fetch payment status
          const paymentResponse = await fetch(
            `https://friendsof16api.up.railway.app/api/payments/${userId}`
          );

          if (paymentResponse.status === 200) {
            setPaymentStatus("Active");
          }
        } catch (error) {
          console.error("Failed to fetch user data or payment status:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0]).join("");
    return initials;
  };

  return (
    <div className="w-full h-[100dvh] py-[10px] lg:py-[20px]">
      <div className="bg-white fixed w-full top-0 px-[24px] lg:px-[96px] pt-[10px]">
        <div className="w-full flex justify-between items-center mt-[15px]">
          <p
            className="font-bold text-[18px] cursor-pointer"
            onClick={() => {
              navigate(`/`);
              scrollToTop();
            }}
          >
            16/16
          </p>
          <button
            className="font-normal text-[18px]"
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
      {loading ? (
        <div className="w-full h-[80vh] flex justify-center items-center">
          <div
            className="w-8 h-8 border-4 border-t-4 border-black rounded-full animate-spin"
            style={{
              borderTopColor: "transparent",
            }}
          ></div>
        </div>
      ) : (
        <div className="px-[24px] lg:px-[96px] h-[82dvh] grid content-between lg:flex lg:justify-between pb-[0px]">
          <div
            className="lg:w-[400px] flex flex-col gap-4 cursor-pointer"
            onClick={() => navigate(`/profile`)}
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-2">
                <div className="relative w-[52px] h-[52px] bg-[#0a0a0a] rounded-full flex items-center justify-center text-[18px] font-bold text-white">
                  {getInitials(userData.Name)}
                  {paymentStatus === "Active" ? (
                    <div className="absolute h-[12px] w-[12px] top-1 right-0 bg-[#47CD89] rounded-full"></div>
                  ) : (
                    <div className="absolute h-[12px] w-[12px] top-1 right-0 bg-[#ff0000] rounded-full"></div>
                  )}
                </div>
                <div className="flex flex-col gap-0">
                  <p className="font-bold text-[18px]">{userData.Name}</p>
                  <p className="font-normal text-[18px]">{paymentStatus}</p>
                </div>
              </div>
              <img src={arrow} alt="" className="cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-col gap-[24px] lg:items-end">
            <p
              className="font-bold text-[18px] hover:text-[#FF3131] cursor-pointer"
              onClick={() => {
                navigate(`/`);
                scrollToTop();
              }}
            >
              Home
            </p>
            <p
              className="font-bold text-[18px] hover:text-[#FF3131] cursor-pointer"
              onClick={() => {
                navigate(`/about`);
                scrollToTop();
              }}
            >
              About 16/16
            </p>
            {paymentStatus === "Active" ? (
              <p
                className="font-bold text-[18px] cursor-pointer hover:text-[#FF3131]"
                onClick={() => {
                  navigate(`/co-working`);
                  scrollToTop();
                }}
              >
                Book a Spot
              </p>
            ) : null}
            <p
              className="font-bold text-[18px] cursor-pointer hover:text-[#FF3131]"
              onClick={() => {
                navigate(`/membership`);
                scrollToTop();
              }}
            >
              Membership
            </p>
            {/* <p
              className="font-bold text-[18px] hover:text-[#FF3131] cursor-pointer"
              onClick={() => {
                navigate(`/about`);
                scrollToTop();
              }}
            >
              FAQs
            </p> */}
            <div className="flex gap-0 items-start justify-start lg:items-center">
              <a
                href="https://www.16by16.co/home/reservations "
                target="_blank"
                rel="noreferrer"
                className="link-no-highlight text-[18px] font-bold hover:text-[#FF3131]"
              >
                Reservations
              </a>
              <img src={arrowUp} alt="" />
            </div>
            <div
              className="link-no-highlight flex gap-0 items-start justify-start lg:items-center"
              onClick={toggleDrawer}
            >
              <p className="text-[18px] font-bold hover:text-[#FF3131] cursor-pointer">
                Contact us
              </p>
              <img src={arrowUp} alt="" />
            </div>
          </div>
        </div>
      )}

      {window.innerWidth <= 768 ? (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          direction="bottom"
          className="w-full px-[24px] pt-[26px] pb-[48px] overflow-y-auto"
          size={250}
        >
          <div className="w-full flex flex-col gap-[26px]">
            <div className="flex flex-col gap-4">
              <div className="flex gap-0 items-start justify-start">
                <p className="text-[18px] font-bold">Contact us</p>
                <img src={arrowUp} alt="" />
              </div>
              <button
                className="w-full h-[74px] text-[18px] font-bold border border-black text-black"
                onClick={handleWhatsAppClick}
              >
                WhatsApp
              </button>
              <button
                className="w-full h-[74px] text-[18px] font-bold border border-black text-black"
                onClick={handleEmailClick}
              >
                Email
              </button>
            </div>
          </div>
        </Drawer>
      ) : (
        <Modal open={isOpen} onClose={toggleDrawer} center closeIcon>
          <div className="w-[500px] flex flex-col gap-[26px] p-4">
            <div className="flex gap-[5px] items-center justify-start">
              <p className="text-[18px] font-bold">Contact us</p>
              <img src={arrowUp} alt="" width={30} />
            </div>
            <div className="flex flex-col gap-4">
              <button
                className="w-full h-[74px] text-[18px] font-bold border border-black text-black hover:text-[#FF3131] hover:border-[#FF3131]"
                onClick={handleWhatsAppClick}
              >
                WhatsApp
              </button>
              <button
                className="w-full h-[74px] text-[18px] font-bold border border-black text-black hover:text-[#FF3131] hover:border-[#FF3131]"
                onClick={handleEmailClick}
              >
                Email
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MenuProfile;
