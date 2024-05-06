import image from "../assets/image.png";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";
import img5 from "../assets/img5.png";
import img6 from "../assets/img6.png";
import img7 from "../assets/img7.png";

export const COWORKING = [
  {
    id: 1,
    title: "Co-working",
    imgurl: image,
    hours: ["12pm to 4pm", "4pm to 8pm"],
    days: ["Tue, Jan 23", "Wed, Jan 24"],
  },
];

export const PRONOUNS = ["He/Him", "She/Her", "They/Them", "Prefer not to say"];

export const SLIDESHOW = [img1, img2, img3, img4, img5, img6, img7];

{
  /* <input
                  type="text"
                  readOnly
                  value={inputPlaceholder}
                  className="w-full h-[56px] border border-black py-2 px-[12px] w-full"
                />
                <button
                  onClick={() => setShowCalendar((prevState) => !prevState)}
                  className="absolute right-0 top-0 h-full px-3 flex items-center"
                >
                  <img src={calendarIcon} alt="" />
                </button>
                {showCalendar && (
                  <div className="w-full md:w-[45%] absolute right-0 mt-2 p-2 bg-white border border-black rounded-none">
                    <Calendar
                      onChange={(date) =>
                        setProfileInfo((prevState) => ({
                          ...prevState,
                          selectedDate: date,
                        }))
                      }
                      value={profileInfo.selectedDate} // Add this line
                      className="border-none"
                      maxDate={new Date()}
                    />
                  </div>
                )} */
}
