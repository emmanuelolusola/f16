import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow_forward_ios.svg";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState("Inactive");

  const navigate = useNavigate();
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
          <div className="lg:w-[500px] flex flex-col gap-8">
            <div className="w-full flex justify-between items-start">
              <div className="flex gap-2">
                <div className="relative w-[52px] h-[52px] bg-[#d9d9d9] rounded-full">
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
              {/* <p
                className="font-normal text-[18px] cursor-pointer"
                onClick={() => navigate(`/profile/edit`)}
              >
                Edit
              </p> */}
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-10">
                <p className="font-normal text-[18px]">Joined</p>
                <p className="font-bold text-[18px]">
                  {/* Payment Info not added yet */}
                  {userData.Name}
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className="font-normal text-[18px]">Expires</p>
                <p className="font-bold text-[18px]">
                  {/* Payment Info not added yet */}
                  {userData.Name}
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className="font-normal text-[18px]">Phone</p>
                <p className="font-bold text-[18px]">
                  {userData["Phone Number (from Application)"][0]}
                </p>
              </div>
              <div className="flex justify-between gap-10">
                <p className=" font-normal text-[18px]">Email</p>
                <p className="w-[70%] lg:w-[80%] font-bold text-[18px] break-all text-end">
                  {userData["Email Address (from Application)"][0]}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 lg:items-end">
            <div
              className="lg:w-[200px] flex justify-between items-center cursor-pointer hover:text-[#ff0000]"
              onClick={() => navigate(`/profile/info`)}
            >
              <p className="font-bold text-[18px]">Profile</p>
              <img src={arrow} alt="" />
            </div>
            <div
              className="lg:w-[200px] flex justify-between items-center cursor-pointer hover:text-[#ff0000]"
              onClick={() => navigate(`/profile/bookings`)}
            >
              <p className="font-bold text-[18px]">Bookings</p>
              <img src={arrow} alt="" />
            </div>
            <div
              className="lg:w-[200px] flex justify-between items-center cursor-pointer hover:text-[#ff0000]"
              onClick={() => navigate(`/profile/payments`)}
            >
              <p className="font-bold text-[18px]">Payment</p>
              <img src={arrow} alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
