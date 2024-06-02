import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../queries/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(inputValue));
    setErrorMessage("");
  };

  const handleButtonClick = async () => {
    const data = { email };
    try {
      setLoading(true);
      await login(data);
      setLoading(false);
      navigate(`/login-sent?email=${email}`);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Account not found");
    }
  };

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
      <div className="w-full h-[82dvh] px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col justify-between">
        <div className="w-full flex flex-col gap-4">
          <p className="font-bold text-[18px] lg:text-[24px]">
            Login to Friends of 16
          </p>
          <div className="w-full flex flex-col gap-0">
            <p className="text-[18px] lg:text-[24px] font-normal">
              Email Address
            </p>
            <input
              type="email"
              id="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              className="w-full h-[64px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] lg:text-[24px] px-[12px] py-[10px]"
            />
            {errorMessage && (
              <p className="text-red-500 text-[18px] lg:text-[24px]">
                {errorMessage}
              </p>
            )}
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
              disabled={!isEmailValid}
              className="w-full h-[74px] text-[18px] font-bold bg-black text-white disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
              onClick={handleButtonClick}
              // onClick={() => navigate(`/login-sent?email=${email}`)}
            >
              Send Login Link
            </button>
          )}
        </div>
        <div
          className="w-full cursor-pointer"
          onClick={() => navigate(`/membership`)}
        >
          <p className="text-[18px] lg:text-[24px] font-normal text-center underline underline-offset-2">
            Apply for membership
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
