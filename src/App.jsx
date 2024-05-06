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
          <Route
            path="/membership/application/received"
            element={<ApplicationReceived />}
          />
          <Route path="/co-working" element={<Coworking />} />
          <Route path="/booked-coworking" element={<BookedCoworking />} />
          <Route path="/about" element={<About />} />
          <Route path="/event/:id" element={<Event />} />
          <Route path="/event/:id/registered" element={<Registered />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
