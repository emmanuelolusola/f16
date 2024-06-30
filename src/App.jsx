import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTopOnRouteChange from "./ScrollToTopOnRouteChange";
import HomeNew from "./components/home/HomeNew";
import Menu from "./components/menu/Menu";
import About from "./components/menu/About";
import Event from "./components/events/Event";
import Registered from "./components/events/Registered";
import Coworking from "./components/menu/Coworking";
import MailingList from "./components/home/MailingList";
import BookedCoworking from "./components/menu/BookedCoworking";
import Membership from "./components/menu/Membership";
import MembershipApplication from "./components/menu/MembershipApplication";
import ApplicationReceived from "./components/menu/ApplicationReceived";
import MembershipAbout from "./components/menu/MembershipAbout";
import Login from "./components/auth/Login";
import LoginSent from "./components/auth/LoginSent";
import MenuProfile from "./components/auth/MenuProfile";
import Payment from "./components/auth/Payment";
import PaymentConfirm from "./components/auth/PaymentConfirm";
import Profile from "./components/auth/Profile";
import ProfileEdit from "./components/auth/ProfileEdit";
import ProfileInfo from "./components/auth/ProfileInfo";
import ProfileBookings from "./components/auth/ProfileBookings";
import ProfilePayment from "./components/auth/ProfilePayment";
import VerifyToken from "./components/auth/VerifyToken";
import Tour from "./components/auth/Tour";
import ByeLaws from "./components/auth/ByeLaws";

function App() {
  return (
    <>
      <Router>
        <ScrollToTopOnRouteChange />
        <Routes>
          <Route path="/" element={<HomeNew />} exact />
          <Route path="/menu" element={<Menu />} exact />
          <Route path="/membership-program" element={<MailingList />} exact />
          <Route path="/membership" element={<Membership />} exact />
          <Route
            path="/membership/application"
            element={<MembershipApplication />}
            exact
          />
          <Route path="/membership/about" element={<MembershipAbout />} exact />
          <Route
            path="/membership/application/received"
            element={<ApplicationReceived />}
            exact
          />
          <Route path="/co-working" element={<Coworking />} exact />
          <Route path="/booked-coworking" element={<BookedCoworking />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/event/:id" element={<Event />} exact />
          <Route path="/event/:id/registered" element={<Registered />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/verify" element={<VerifyToken />} exact />
          <Route path="/login-sent" element={<LoginSent />} exact />
          <Route path="/profile/menu" element={<MenuProfile />} exact />
          <Route path="/profile/payment" element={<Payment />} exact />
          <Route
            path="/profile/payment/confirm"
            element={<PaymentConfirm />}
            exact
          />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/profile/edit" element={<ProfileEdit />} exact />
          <Route path="/profile/info" element={<ProfileInfo />} exact />
          <Route path="/profile/bookings" element={<ProfileBookings />} exact />
          <Route path="/profile/payments" element={<ProfilePayment />} exact />
          <Route path="/tour" element={<Tour />} exact />
          <Route path="/bye-laws" element={<ByeLaws />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
