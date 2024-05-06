import React from "react";

const ScrollToTopOnRouteChange = () => {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return null;
};

export default ScrollToTopOnRouteChange;
