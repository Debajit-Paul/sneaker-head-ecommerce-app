import React from "react";
import {
  AiFillLinkedin,
  AiOutlineTwitter,
  AiOutlineGithub,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Sneaker Head All rights reserverd</p>
      <p className="icons">
        <a href="https://www.linkedin.com/in/debajit-paul/">
          <AiFillLinkedin />
        </a>
        <a href="https://github.com/Debajit-Paul">
          <AiOutlineGithub />
        </a>
        <a href="https://twitter.com/Devojit_paul">
          <AiOutlineTwitter />
        </a>
      </p>
    </div>
  );
};

export default Footer;
