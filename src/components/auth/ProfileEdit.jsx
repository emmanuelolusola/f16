import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleFirstnameChange = (e) => {
    const inputFirstname = e.target.value;
    setFirstname(inputFirstname);
  };

  const handleLastnameChange = (e) => {
    const inputLastname = e.target.value;
    setLastname(inputLastname);
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);
  };

  // const handleButtonClick = async () => {
  //   const data = { email };
  //   try {
  //     setLoading(true);
  //     await login(data);
  //     setLoading(false);
  //     navigate(`/login-sent?email=${email}`);
  //   } catch (error) {
  //     setLoading(false);
  //     setErrorMessage("Account not found");
  //   }
  // };

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="w-full h-[100dvh] py-[10px] lg:py-[20px]">
      <div className="bg-white fixed w-full top-0 px-[24px] lg:px-[96px] pt-[10px]">
        <div className="w-full flex justify-between items-center mt-[15px]">
          <p
            className="font-bold text-[18px] lg:text-[24px] cursor-pointer"
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
      <div className="h-[80px] lg:h-[120px]"></div>
      <div className="w-full px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col justify-between pb-14">
        <div className="w-full flex flex-col gap-12">
          <div className="w-full flex flex-col gap-10">
            <p className="font-bold text-[18px] lg:text-[24px]">Edit Details</p>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full flex justify-center items-center">
                <div className="w-[120px] h-[120px] bg-[#D9D9D9] rounded-full"></div>
              </div>
              <div className="w-full flex justify-center gap-8">
                <p className="text-[18px] lg:text-[24px] font-bold">Upload</p>
                <p className="text-[18px] lg:text-[24px] text-[#D92D20] font-bold">
                  Remove
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">First Name</p>
              <input
                type="text"
                id="name"
                value={firstname}
                onChange={handleFirstnameChange}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>

            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Last Name</p>
              <input
                type="text"
                id="name"
                value={lastname}
                onChange={handleLastnameChange}
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
            {loading ? (
              <button
                disabled
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
              >
                Please wait
              </button>
            ) : (
              <button
                disabled={!firstname || !lastname || !phone}
                className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                // onClick={handleButtonClick}
                onClick={() => navigate(`/login-sent?email=${email}`)}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
