import React from 'react';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'; //react icons  ///////////////////////////////////////////////////

const Footer = () => {
  return (
    <div className="footer-container">
      <p> 2022 Smart Deals All rights reserved</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};

export default Footer;
