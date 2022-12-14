
import React from 'react';
import { Image } from '@themesberg/react-bootstrap';
import logo from "../assets/img/logo-ftwkf.png"
import ReactLogo from "../assets/img/technologies/react-logo-transparent.svg";

export default (props) => {

  const { show } = props;

  return (
    <div className={`preloader bg-soft flex-column justify-content-center align-items-center ${show ? "" : "show"}`}>
      <Image className="loader-element animate__animated animate__jackInTheBox" src={logo} height={80} />
    </div>
  );
};
