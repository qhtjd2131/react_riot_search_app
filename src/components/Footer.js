import React from "react";
import "./Footer.css";

const ProducerName = () => {
  return <div className="producer_name"> Producer : bosung </div>;
};

const ProducerPhoneNumber = () => {
  return <div className="producer_phone"> 010 - XXXX - XXXX </div>;
};
function Footer() {
  return (
    <div className="footer_container">
      <div className="producer">
        <ProducerName />
        <ProducerPhoneNumber />
      </div>
    </div>
  );
}
export default Footer;
