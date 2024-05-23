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

function App() {
  return (
    <>
      <Router>
        <ScrollToTopOnRouteChange />
        <Routes>
          <Route path="/" element={<HomeNew />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/membership-program" element={<MailingList />} />
          <Route path="/membership" element={<Membership />} />
          <Route
            path="/membership/application"
            element={<MembershipApplication />}
          />
          <Route path="/membership/about" element={<MembershipAbout />} />
          <Route
            path="/membership/application/received"
            element={<ApplicationReceived />}
          />
          <Route path="/co-working" element={<Coworking />} />
          <Route path="/booked-coworking" element={<BookedCoworking />} />
          <Route path="/about" element={<About />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/event/:id/registered" element={<Registered />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-sent" element={<LoginSent />} />
          <Route path="/profile/menu" element={<MenuProfile />} />
          <Route path="/profile/payment" element={<Payment />} />
          <Route path="/profile/payment/confirm" element={<PaymentConfirm />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
