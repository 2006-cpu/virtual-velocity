import React from "react";
import "./Footer.css";
import { CardColumns } from "react-bootstrap";

const Footer = (props) => {
  return (
    <>
      <div id="footerdiv" className="footer">
        <footer className="py-5 fullWidth bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white">
              Copyright 2020 &copy; Virtual Velocity Team |{" "}
              <a href="#">Privacy Policy</a> | <a href="#">Terms Of Service</a>{" "}
              | Website powered by: Virtual Velocity Team{" "}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
