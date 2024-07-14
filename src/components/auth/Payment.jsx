import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow_forward_ios.svg";
import { PAYMENT } from "../../utils/constants";

const Payment = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
            const paymentResponse = await fetch(
              `https://friendsof16api.up.railway.app/api/payments/${userId}`
            );
            if (paymentResponse.ok) {
              navigate("/menu");
            }
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const scrollToTop = () => {
    window.scroll(0, 0);
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
        <div className="w-full h-[82dvh] px-[24px] lg:px-0 lg:w-[600px] lg:mx-auto flex flex-col justify-between">
          <div className="w-full flex flex-col gap-4">
            <p className="font-bold text-[18px]">
              Welcome, {userData["First Name (from Application)"][0]}
            </p>
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">
                Choose a payment option to activate your Friends of 16
                membership.
              </p>
            </div>
            {PAYMENT.map((option) => (
              <div
                key={option.id}
                className="w-full flex justify-between items-center border border-[#e0e0e0] py-4 px-4"
                onClick={() =>
                  navigate(`/profile/payment/confirm`, { state: option })
                }
              >
                <div className="flex flex-col">
                  <p className="font-bold text-[18px]">Pay {option.amount}</p>
                  <p className="text-[18px] font-normal">For {option.period}</p>
                </div>
                <img src={arrow} alt="" />
              </div>
            ))}
          </div>
          <div
            className="w-full cursor-pointer"
            onClick={() => navigate(`/menu`)}
          >
            <p className="text-[18px] font-normal text-center underline underline-offset-2">
              I'll do this later
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
