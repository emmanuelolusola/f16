import React from "react";
import { useNavigate } from "react-router-dom";

const ByeLaws = () => {
  const navigate = useNavigate();
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

      <div className="flex flex-col gap-8 px-[24px] lg:w-[600px] lg:mx-auto lg:px-0 pb-[100px] lg:pb-[100px] pt-[20px]">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[18px] lg:text-[24px]">
            FRIENDS OF 16 BYE-LAWS{" "}
          </p>
          <div className="flex flex-col gap-4">
            <p className="font-normal text-[18px] lg:text-[24px]">
              16/16 is a dual concept boutique residence and creative space—a
              space that centres around a gallery promoting up-and-coming
              artists in Lagos, Nigeria with a focus on cultural exchange and
              collaboration. 16/16 is a space for thinkers, artists, builders,
              travellers, movers and shakers. It is for anyone, really, who
              wishes to experience the cultural and creative Lagos and who
              wishes to collaborate in order to see this city take its place as
              a bastion of culture on the African continent and the globe.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              We operate as a design-focused space, where humility meets high
              quality. With an eye towards simplicity and using only materials
              found around us, we have created a safe haven for travellers and
              creatives away from the hustle and bustle of Lagos. Throughout our
              eight-year history operating as a hotel, gallery and creative
              incubator, we have asked questions that lie at the intersection of
              hospitality, art, efficiency and beauty. This allows us to present
              a new prototype that provides shelter while also orienting guests
              to the greater perspectives that our city offers.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              The launch of Friends of 16 marks our transition to a membership
              club. As such, it is important that we instill simple rules to
              guide our activities as we connect creative leaders in Nigeria to
              their counterparts in West Africa.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[18px] lg:text-[24px]">
            VISION AND MISSION
          </p>
          <div className="flex flex-col gap-0">
            <p className="font-normal text-[18px] lg:text-[24px]">VISION</p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Friends of 16 is the nexus that connects 16/16’s hospitality
              clients to its creative community.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Becoming a Friend of 16 is the precursor to accessing our creative
              incubator. Our incubator operates by collaborating with artists,
              creatives, cultural practitioners, and entrepreneurs. We are the
              bridge that connects innovative creators across West Africa and
              the world at large.
            </p>
          </div>
          <div className="flex flex-col gap-0">
            <p className="font-normal text-[18px] lg:text-[24px]">MISSION</p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Ideas, services and products enable us to oil the engine that
              drives the creative leaders of tomorrow. This involves
              deliberation, co-creation, and fun. Our collaborative projects aim
              to generate a return that invests in our Friends-based programming
              and expanding our network.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[18px] lg:text-[24px]">
            CULTURE AND VALUES
          </p>
          <div className="flex flex-col gap-0">
            <p className="font-normal text-[18px] lg:text-[24px]">OPENESS</p>
            <p className="font-normal text-[18px] lg:text-[24px]">GENTLENESS</p>
            <p className="font-normal text-[18px] lg:text-[24px]">PATIENCE</p>
            <p className="font-normal text-[18px] lg:text-[24px]">HONESTY</p>
            <p className="font-normal text-[18px] lg:text-[24px]">LEARNING</p>
            <p className="font-normal text-[18px] lg:text-[24px]">COOLNESS</p>
            <p className="font-normal text-[18px] lg:text-[24px]">CONFIDENCE</p>
            <p className="font-normal text-[18px] lg:text-[24px]">HARD WORK</p>
            <p className="font-normal text-[18px] lg:text-[24px]">EFFICIENCY</p>
            <p className="font-normal text-[18px] lg:text-[24px]">BALANCE</p>
            <p className="font-normal text-[18px] lg:text-[24px]">CARING</p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              COLLABORATION
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">DISCRETION</p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              SELF-SERVICE
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              USE THE WEB APP
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              NO SMOKING INDOORS
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[18px] lg:text-[24px]">
            YOUR APPLICATION
          </p>
          <div className="flex flex-col gap-4">
            <p className="font-normal text-[18px] lg:text-[24px]">
              By completing and submitting an application to become a Friend of
              16, you agree to be bound by these bye-laws.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              The Friends of 16 Membership Committee meets every quarter and
              admits new applicants when there is space available. Friends of 16
              are welcome to propose new Friends by sharing with them our web
              app: friends.16by16.co
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              The Friends of 16 Membership Committee shall have the sole
              discretion as to who shall become a Friend of 16. If your
              membership is accepted we will send you a welcome email. Upon
              receipt of the welcome email Friends of 16 shall retain an
              "Active" status for one year.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[18px] lg:text-[24px]">
            MEMBERSHIP AND PAYMENTS
          </p>
          <div className="flex flex-col gap-4">
            <p className="font-normal text-[18px] lg:text-[24px]">
              The Friends of 16 annual and semi-annual membership fees are
              payable fully in advance before a Friend becomes active in the
              16/16 community. A Friend of 16 will not be admitted into our
              spaces if their fees are left unpaid. In the event a Friend of 16,
              with membership fees outstanding, is granted admission into 16/16
              spaces they will be subject to a N5,000 entry fee.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Friends are expected to make membership payments on the Friends of
              16 website. Upon receipt of payment, membership status will switch
              from “Inactive” to “Active.” Inactive members are unable to access
              the co-working and event booking pages.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Memberships are non-transferable and non-refundable. The use of
              membership benefits is strictly reserved for Friends of 16.
              Members are expected to comply with all house rules and bye-laws.
              Failure to do so may result in temporary suspension or permanent
              revocation of membership privileges.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              All food and drinks purchased from the 8th Floor Honesty Bar and
              2nd Floor Bar will be paid for by cash, card or with Friend of 16
              credit. Space rentals and products purchased within 16/16 may need
              to be paid for in advance or on the same day.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Where a Friend of 16 is unable to settle their purchases through
              our recommended means, said Friend is expected to send 16/16 a
              payment as soon as possible. A new purchase cannot be made until a
              Friend's tab is cleared.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-[18px] lg:text-[24px]">GUEST POLICY</p>
          <div className="flex flex-col gap-4">
            <p className="font-normal text-[18px] lg:text-[24px]">
              Friends of 16 are allowed to invite guests who are upstanding and
              are at least 21 years old. A Friend is allowed a maximum of two
              guests per visit. In the event a Friend of 16 requires more than
              two guests to gain entry into the lounge space, permission must be
              granted by manager on duty with 16/16 security facilitating entry
              into the premises. The lounge space is on the 8th floor of the
              building. It is a space for co-working, communal gathering and
              making new friends.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Guests will not gain entry into 16/16 without their host present,
              nor will they be left unattended by their Friend host. Depending
              on the size of a Friend of 16's party, entry fees may apply. The
              administration of the entry fee will be communicated before
              Friends of 16 and their guests arrive and are admitted into the
              building.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Members can book the space for private events through the Friends
              of 16 platform. Bookings must be made at least three days in
              advance. Members of the public can also use the space upon signing
              a space rental agreement and making a full payment before their
              event.
            </p>
            <p className="font-normal text-[18px] lg:text-[24px]">
              Friends of 16 are liable to face penalties for any violations made
              by their guests.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-0">
          <p className="font-bold text-[18px] lg:text-[24px]">
            HOURS OF OPERATION AND SERVICES
          </p>
          <div className="flex flex-col gap-0">
            <div className="w-full flex py-4 justify-between items-start border-b border-black">
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Monday
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]"></p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Closed, except for hotel guests
              </p>
            </div>
            <div className="w-full flex py-4 justify-between items-start border-b border-black">
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Tuesday
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                12 pm to 8 pm
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Co-working
              </p>
            </div>
            <div className="w-full flex py-4 justify-between items-start border-b border-black">
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Wednesday
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                12 pm to 8 pm
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Co-working
              </p>
            </div>
            <div className="w-full flex py-4 justify-between items-start border-b border-black">
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Thursday
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                12 pm to 8 pm
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Co-working
              </p>
            </div>
            <div className="w-full flex py-4 justify-between items-start border-b border-black">
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Friday
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                12 pm to 11 pm
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                #OpenWeekend
              </p>
            </div>
            <div className="w-full flex py-4 justify-between items-start border-b border-black">
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Saturday
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                12 pm to 11 pm
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                #OpenWeekend
              </p>
            </div>
            <div className="w-full flex py-4 justify-between items-start border-b border-black">
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                Sunday
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                12 pm to 11 pm
              </p>
              <p className="w-full font-normal text-[18px] lg:text-[24px]">
                #OpenWeekend
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full fixed bottom-0 py-6 px-[24px]  lg:px-0">
        <div
          className="w-full h-[66px] bg-[#0a0a0a] text-white text-[18px] lg:text-[24px] font-bold flex justify-center items-center lg:w-[600px] lg:mx-auto"
          onClick={() => {
            navigate(`/tour`);
            scrollToTop();
          }}
        >
          I agree
        </div>
      </div>
    </div>
  );
};

export default ByeLaws;
