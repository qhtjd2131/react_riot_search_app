import React from "react";

const ProducerName = () => {
  return <div> Producer : bosung </div>;
};

const ProducerPhoneNumber = () => {
  return <div> 010 - XXXX - XXXX </div>;
};
function Footer() {
  return (
    <div>
      <ProducerName />

      <ProducerPhoneNumber />
    </div>
  );
}
export default Footer;
