import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    const whatsappNumber = "+2348123234586";
    const message = encodeURIComponent(`Hi 16/16,`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
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
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const scrollToTop = () => {
    window.scroll(0, 0);
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
        <div className="w-full px-[24px] lg:px-0 lg:w-[600px] lg:mx-auto flex flex-col gap-4 pb-10">
          <div className="flex flex-col gap-2 mt-[20px] lg:mt-[50px]">
            <p className="text-[18px] font-bold lg:text-center">Profile</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            {/* PERSONAL */}
            <div className="w-full p-4 border-2 border-[#E0E0E0] flex flex-col gap-2">
              <p className="text-[#5E5E5E] font-bold text-[18px]">Personal</p>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Pronouns
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Pronouns (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Date of Birth
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Date of Birth (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Occupation
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Occupation (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Company
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Company Name (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="w-full p-4 border-2 border-[#E0E0E0] flex flex-col gap-2">
              <p className="text-[#5E5E5E] font-bold text-[18px]">Address</p>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Nationality
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Nationality (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Home Address
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Address (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Country
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Country (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
            </div>

            {/* CONTACT */}
            <div className="w-full p-4 border-2 border-[#E0E0E0] flex flex-col gap-2">
              <p className="text-[#5E5E5E] font-bold text-[18px]">Contact</p>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Email Address
                </p>
                <p className="text-black font-normal text-[18px] break-all">
                  {userData
                    ? userData["Email Address (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Social Link
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Social Link (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Emergency Contact Name
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData["Emergency Contact Name (from Application)"][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Emergency Contact Relationship
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData[
                        "Emergency Contact Relationship (from Application)"
                      ][0]
                    : "Loading..."}
                </p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#5E5E5E] font-normal text-[14px]">
                  Emergency Contact Phone Number
                </p>
                <p className="text-black font-normal text-[18px]">
                  {userData
                    ? userData[
                        "Emergency Contact Phone Number (from Application)"
                      ][0]
                    : "Loading..."}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[18px] leading-[32px] lg:leading-[42px] lg:text-center">
                To edit your profile information, contact 16/16 via WhatsApp
              </p>
              <button
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white"
                onClick={handleWhatsAppClick}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
