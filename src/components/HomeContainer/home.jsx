import React from "react";
import clas from "./home.module.scss";
import { NavLink } from "react-router-dom";

let Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className={clas.home}>
    
    </div>
  );
};

export default Home;
