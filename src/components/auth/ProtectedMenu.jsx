import React from "react";
import { Navigate, useParams } from "react-router-dom";
import Menu from "../menu/Menu";
import MenuProfile from "./MenuProfile";

const ProtectedMenu = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();

  if (!user) {
    // If the user is not logged in, display the default Menu component
    return <Menu />;
  }

  // If the user is logged in, display the MenuProfile component
  return <MenuProfile userId={id} />;
};

export default ProtectedMenu;
