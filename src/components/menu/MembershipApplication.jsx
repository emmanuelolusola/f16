import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PRONOUNS } from "../../utils/constants";
import { COUNTRIES } from "../../utils/constants";
import { NATIONALITIES } from "../../utils/constants";
import { EMERGENCY } from "../../utils/constants";
import Select from "react-dropdown-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { membershipApplication } from "../../queries/auth";

import calendarIcon from "../../assets/Vector.svg";

const MembershipApplication = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [profileInfo, setProfileInfo] = useState({
    firstName: "",
    lastName: "",
    pronouns: null,
    selectedDate: null,
    occupation: "",
    company: "",
    companyAddress: "",
  });

  const [addressInfo, setAddressInfo] = useState({
    country: "",
    nationality: "",
    address: "",
  });

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    social: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyNumber: "",
    referrer: "",
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const buttonRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleOutsideClick = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  const handleChange = (date) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      selectedDate: date,
    }));
    setShowCalendar(false);
  };

  const handleInputChange = (e, key, setState) => {
    const inputValue = e.target.value;
    setState((prevState) => ({
      ...prevState,
      [key]: inputValue,
    }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const inputPlaceholder = profileInfo.selectedDate
    ? format(profileInfo.selectedDate, "yyyy-MM-dd")
    : "Select Date";

  const handleSubmit = async () => {
    const pronouns = profileInfo.pronouns
      ? profileInfo.pronouns.toLowerCase()
      : null;

    const data = {
      "First Name": profileInfo.firstName,
      "Last Name": profileInfo.lastName,
      Pronouns: pronouns,
      "Date of Birth": profileInfo.selectedDate
        ? format(profileInfo.selectedDate, "yyyy-MM-dd")
        : null,
      Occupation: profileInfo.occupation,
      "Company Name": profileInfo.company,
      Country: addressInfo.country,
      Nationality: addressInfo.nationality,
      Address: addressInfo.address,
      "Phone Number": contactInfo.phone,
      "Email Address": contactInfo.email,
      "Social Link": contactInfo.social,
      "Emergency Contact Name": contactInfo.emergencyName,
      "Emergency Contact Relationship": contactInfo.emergencyRelationship,
      "Emergency Contact Phone Number": contactInfo.emergencyNumber,
      Referrer: contactInfo.referrer,
    };
    try {
      setLoading(true);
      const res = await membershipApplication(data);
      console.log(res);
      setLoading(false);

      navigate(`/membership/application/received?email=${contactInfo.email}`);
    } catch (error) {
      setLoading(false);
      error;
    }
  };

  const scrollToTop = () => {
    window.scroll(0, 0);
  };

  return (
    <div className="w-full h-full py-[10px] lg:py-[20px]">
      <div className="w-full fixed top-0 flex justify-between items-center py-[15px] lg:pb-0 lg:pt-[30px] px-[24px] lg:px-[96px] bg-white z-10">
        <p
          className="font-bold text-[18px] lg:text-[24px]"
          onClick={() => {
            navigate(`/`);
            scrollToTop();
          }}
        >
          16/16
        </p>
        <p
          className="font-normal text-[18px] lg:text-[24px] cursor-pointer"
          onClick={() => {
            navigate(`/menu`);
            scrollToTop();
          }}
        >
          Menu
        </p>
      </div>
      <div className="w-full px-[24px] lg:px-[96px]">
        <div className="mt-[50px] lg:mt-[70px] border border-b-black opacity-[10%]"></div>
      </div>
      <div className="px-[24px] lg:px-0 lg:w-[800px] lg:mx-auto flex flex-col gap-4 lg:gap-8">
        <div className="flex flex-col gap-4 mt-[20px] lg:mt-[50px]">
          <p className="text-[18px] lg:text-[24px] font-bold lg:text-center">
            Apply to Friends of 16
          </p>
        </div>
        <div className="w-full flex overflow-x-auto items-center lg:flex-row gap-2 mb-4 lg:mb-8">
          <StepTab isActive={step === 1} stepNumber={1}>
            Profile
          </StepTab>
          <div className="w-full h-[1px] bg-black opacity-[30%]"></div>
          <StepTab isActive={step === 2} stepNumber={2}>
            Address
          </StepTab>
          <div className="w-full h-[1px] bg-black opacity-[30%]"></div>
          <StepTab isActive={step === 3} stepNumber={3}>
            Contact
          </StepTab>
        </div>
        {step === 1 && (
          <div
            className={`step flex flex-col gap-4 ${
              step === 1 ? "slide-in" : "slide-out"
            }`}
          >
            <div className="w-full flex flex-col gap-0">
              {/* first name */}
              <p className="text-[18px] font-normal">First Name</p>
              <input
                type="text"
                id="first_name"
                autoFocus
                value={profileInfo.firstName}
                onChange={(e) =>
                  handleInputChange(e, "firstName", setProfileInfo)
                }
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {/* last name */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Last Name</p>
              <input
                type="text"
                id="last_name"
                value={profileInfo.lastName}
                onChange={(e) =>
                  handleInputChange(e, "lastName", setProfileInfo)
                }
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {/* pronouns */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Pronouns</p>
              <Select
                placeholder="Select pronoun"
                options={PRONOUNS.map((pronoun) => ({
                  value: pronoun,
                  label: pronoun,
                }))}
                onChange={(values) =>
                  setProfileInfo((prevState) => ({
                    ...prevState,
                    pronouns: values[0].value,
                  }))
                }
                value={profileInfo.pronouns}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                color="black"
                contentRenderer={() => <div>{profileInfo.pronouns}</div>}
              />
            </div>
            {/* date of birth */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Date of Birth</p>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={inputPlaceholder}
                  className="w-full h-[56px] border border-black py-2 px-[12px] w-full"
                  onClick={() => setShowCalendar((prevState) => !prevState)}
                />
                <button className="absolute right-0 top-0 h-full px-3 flex items-center">
                  <img
                    src={calendarIcon}
                    alt=""
                    onClick={() => setShowCalendar((prevState) => !prevState)}
                  />
                </button>
                {showCalendar && (
                  <div className="w-full md:w-[45%] absolute right-0 mt-2 p-2 bg-white border border-black rounded-none">
                    <Calendar
                      onChange={handleChange}
                      value={profileInfo.selectedDate}
                      className="border-none"
                      maxDate={new Date()}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* occupation */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Occupation</p>
              <input
                type="text"
                id="occupation"
                value={profileInfo.occupation}
                onChange={(e) =>
                  handleInputChange(e, "occupation", setProfileInfo)
                }
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {/* company */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Company Name</p>
              <input
                type="text"
                id="company"
                value={profileInfo.company}
                placeholder="Optional"
                onChange={(e) =>
                  handleInputChange(e, "company", setProfileInfo)
                }
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div
            className={`step flex flex-col gap-4 ${
              step === 2 ? "slide-in" : "slide-out"
            }`}
          >
            {/* nationality */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Nationality</p>
              <Select
                placeholder="Select Nationality"
                options={NATIONALITIES.map((nationality) => ({
                  value: nationality,
                  label: nationality,
                }))}
                onChange={(selectedOption) =>
                  setAddressInfo((prevState) => ({
                    ...prevState,
                    nationality:
                      selectedOption && selectedOption[0]
                        ? selectedOption[0].value
                        : "",
                  }))
                }
                value={{
                  value: addressInfo.nationality,
                  label: addressInfo.nationality,
                }}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                color="black"
              />
            </div>
            {/* address */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Home Address</p>
              <input
                type="text"
                id="address"
                value={addressInfo.address}
                onChange={(e) =>
                  handleInputChange(e, "address", setAddressInfo)
                }
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            <div className="w-full flex flex-col gap-0">
              {/* country */}
              <p className="text-[18px] font-normal">Country</p>
              <Select
                placeholder="Select Country"
                options={COUNTRIES.map((country) => ({
                  value: country.name,
                  label: country.name,
                }))}
                onChange={(selectedOption) =>
                  setAddressInfo((prevState) => ({
                    ...prevState,
                    country:
                      selectedOption && selectedOption[0]
                        ? selectedOption[0].value
                        : "",
                  }))
                }
                value={{
                  value: addressInfo.country,
                  label: addressInfo.country,
                }}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                color="black"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div
            className={`step flex flex-col gap-4 ${
              step === 3 ? "slide-in" : "slide-out"
            }`}
          >
            <div className="w-full flex flex-col gap-0">
              {/* phone number */}
              <p className="text-[18px] font-normal">Phone Number</p>
              <input
                type="tel"
                id="phone"
                autoFocus
                value={contactInfo.phone}
                onChange={(e) => handleInputChange(e, "phone", setContactInfo)}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {/* email address */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Email Address</p>
              <input
                type="email"
                id="email"
                value={contactInfo.email}
                onChange={(e) => handleInputChange(e, "email", setContactInfo)}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {/* social link */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Social Link</p>
              <input
                type="text"
                id="social_link"
                value={contactInfo.social}
                onChange={(e) => handleInputChange(e, "social", setContactInfo)}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            <p className="text-[18px] font-normal">Emergency Contact:</p>
            {/* emergency contact name */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Name</p>
              <input
                type="text"
                id="emergency_contact_name"
                value={contactInfo.emergencyName}
                onChange={(e) =>
                  handleInputChange(e, "emergencyName", setContactInfo)
                }
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {/* emergency contact relationship */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Relationship</p>
              <Select
                placeholder="Select pronoun"
                options={EMERGENCY.map((emergency) => ({
                  value: emergency,
                  label: emergency,
                }))}
                onChange={(values) =>
                  setContactInfo((prevState) => ({
                    ...prevState,
                    emergencyRelationship: values[0].value,
                  }))
                }
                value={contactInfo.emergencyRelationship}
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px] placeholder-[18px]"
                color="black"
                contentRenderer={() => (
                  <div>{contactInfo.emergencyRelationship}</div>
                )}
              />
            </div>
            {/* emergency contact phone number */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Phone Number</p>
              <input
                type="text"
                id="emergency_contact_phone_number"
                value={contactInfo.emergencyNumber}
                onChange={(e) =>
                  handleInputChange(e, "emergencyNumber", setContactInfo)
                }
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
            {/* referrer */}
            <div className="w-full flex flex-col gap-0">
              <p className="text-[18px] font-normal">Who referred you?</p>
              <input
                type="text"
                id="referrer"
                value={contactInfo.referrer}
                onChange={(e) =>
                  handleInputChange(e, "referrer", setContactInfo)
                }
                className="w-full h-[56px] border border-[#0a0a0a50] bg-white text-[#0A0A0A] text-[18px] px-[12px] py-[10px]"
              />
            </div>
          </div>
        )}

        <div>
          {step === 3 ? (
            <div className="">
              {loading ? (
                <button
                  onClick={handleSubmit}
                  disabled
                  className="w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] lg:text-[24px] font-bold mb-[10px] disabled:bg-[#e1e1e1] disabled:text-[#bebebe]"
                >
                  Please wait
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] lg:text-[24px] font-bold mb-[10px]"
                >
                  Submit
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={handleNext}
              disabled={step === 3}
              className="w-full h-[66px] bg-[#0a0a0a] text-[#ffffff] text-[18px] lg:text-[24px] font-bold mb-[10px]"
            >
              Next
            </button>
          )}
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`w-full h-[66px] text-[#0a0a0a] text-[18px] lg:text-[24px] font-bold mb-[10px] ${
              step === 1
                ? "border border-[#e1e1e1] text-[#e1e1e1]"
                : "border border-[#0a0a0a]"
            }`}
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

const StepTab = ({ children, isActive, stepNumber }) => {
  return (
    <div className={`md:w-full flex items-center justify-center`}>
      <div
        className={`w-[24px] lg:w-[32px] h-[24px] lg:h-[32px] flex justify-center items-center rounded-full mr-2 ${
          isActive ? "bg-black text-white" : "bg-[#e1e1e1] text-white"
        }`}
      >
        {stepNumber}
      </div>
      <div
        className={`text-[18px] font-normal cursor-pointer ${
          isActive ? "text-black" : "text-[#e1e1e1]"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MembershipApplication;
