import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfo = () => {
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    const whatsappNumber = "+2348123234586";
    const message = encodeURIComponent(`Hi 16/16,`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
      <div className="bg-white fixed w-full top-0 px-[24px] lg:px-[96px] pt-[10px]">
        <div className="w-full flex justify-between items-center mt-[15px]">
          <p
            className="font-bold text-[18px] lg:text-[24px]"
            onClick={() => {
              navigate(`/`);
              scrollToTop();
            }}
          >
            16/16
          </p>
          <button
            className="font-normal text-[18px] lg:text-[24px]"
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
      <div className="w-full px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col gap-4 pb-10">
        <div className="flex flex-col gap-2 mt-[20px] lg:mt-[50px]">
          <p className="text-[18px] lg:text-[24px] font-bold lg:text-center">
            Profile
          </p>
        </div>
        <div className="w-full flex flex-col gap-4">
          {/* PERSONAL */}
          <div className="w-full p-4 border-2 border-[#E0E0E0] flex flex-col gap-2">
            <p className="text-[#5E5E5E] font-bold text-[18px] lg:text-[24px]">
              Personal
            </p>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Pronouns
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                He/Him
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Date of Birth
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                12/12/1994
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Occupation
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                Software Developer
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Company
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                Piggyvest
              </p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="w-full p-4 border-2 border-[#E0E0E0] flex flex-col gap-2">
            <p className="text-[#5E5E5E] font-bold text-[18px] lg:text-[24px]">
              Address
            </p>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Nationality
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                Nigerian
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Home Address
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                12, Omole Phase I, Ikeja, Lagos
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Country
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                Nigeria
              </p>
            </div>
          </div>

          {/* CONTACT */}
          <div className="w-full p-4 border-2 border-[#E0E0E0] flex flex-col gap-2">
            <p className="text-[#5E5E5E] font-bold text-[18px] lg:text-[24px]">
              Contact
            </p>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Email Address
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                faruqade32@gmail.com
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Social Link
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                twitter.com/one_random_guy
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Emergency Contact Name
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                Elvis Presley
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Emergency Contact Relationship
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                Grandfather
              </p>
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-[#5E5E5E] font-normal text-[14px] lg:text-[18px]">
                Emergency Contact Phone Number
              </p>
              <p className="text-black font-normal text-[18px] lg:text-[24px]">
                09087562201
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-[18px] lg:text-[24px] leading-[32px] lg:leading-[42px] lg:text-center">
              To edit your profile information, contact 16/16 via WhatsApp
            </p>
            <button
              className="w-full h-[74px] text-[18px] lg:text-[24px] font-bold bg-black text-white"
              onClick={handleWhatsAppClick}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
