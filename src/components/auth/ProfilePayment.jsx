import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePayment = () => {
  const navigate = useNavigate();
  const [activateButton, setActivateButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    duration: "",
    startDate: "",
    endDate: "",
  });

  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://friendsof16api.up.railway.app/api/payments/${userID}`
        );
        if (response.status !== 200) {
          setActivateButton(true);
        } else {
          setActivateButton(false);
          const data = await response.json();
          localStorage.setItem("paymentStatus", data.status);
          if (data.status === "success") {
            const {
              Amount,
              "Start Date": startDate,
              "End Date": endDate,
              Product,
            } = data.payment.fields;
            setPaymentDetails({
              amount: Amount,
              duration: Product,
              startDate,
              endDate,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

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

    // if (date.toDateString() === today.toDateString()) {
    //   return "Today";
    // }

    const day = date.getDate();
    const suffix = getOrdinalSuffix(day);
    const options = { weekday: "long", month: "long", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);

    const [weekday, month, year] = formattedDate.split(" ");
    return `${weekday} ${day}, ${month}`;
  };

  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
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
      <div className="h-[60px] lg:h-[40px]"></div>
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
        <div className="w-full h-[90vh] px-[24px] lg:px-0 lg:w-[600px] lg:mx-auto flex flex-col justify-between gap-8 pb-10">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2 mt-[20px] lg:mt-[50px]">
              <p className="text-[18px] font-bold">Payments</p>
            </div>
            {activateButton ? (
              <div>
                <p className="text-black font-normal text-[18px]">
                  Payment not found
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col gap-6">
                <div className="w-full p-4 border-2 border-[#E0E0E0] flex flex-col gap-2">
                  <div className="flex flex-col gap-0">
                    <p className="text-[#5E5E5E] font-normal text-[14px]">
                      Plan Amount
                    </p>
                    <p className="text-black font-normal text-[18px]">
                      {paymentDetails.amount}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-[#5E5E5E] font-normal text-[14px]">
                      Duration
                    </p>
                    <p className="text-black font-normal text-[18px]">
                      {paymentDetails.duration}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-[#5E5E5E] font-normal text-[14px]">
                      Start
                    </p>
                    <p className="text-black font-normal text-[18px]">
                      {formatDate(paymentDetails.startDate)}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0">
                    <p className="text-[#5E5E5E] font-normal text-[14px]">
                      Expires
                    </p>
                    <p className="text-black font-normal text-[18px]">
                      {formatDate(paymentDetails.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {activateButton && (
            <div className="w-full flex flex-col gap-2 justify-center">
              <button
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white"
                onClick={() => navigate(`/profile/payment`)}
              >
                Activate Membership
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePayment;
