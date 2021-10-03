import React, { useState } from "react";
import "./Header.css";

function Header({ setNickNamae_in_header }) {
  const Logo = () => {
    return <div className="logo">BOSUNG.GG</div>;
  };

  const InputBox = () => {
    const [input, setInput] = useState("");
    const onChange = (e) => {
      setInput(e.target.value);
    };

    const handleSearchButton = () => {

      setNickNamae_in_header(input.toLowerCase());
      const string = "가자ABC";
      console.log(string.toLowerCase());
      setInput("");
    };

    return (
      <div className="input_box">
        <input
          className="input"
          type="text"
          name="nickName"
          value={input}
          onChange={onChange}
          spellCheck={false}
          autoComplete="off"
        />
        <button className="addButton" onClick={handleSearchButton}>
          search
        </button>
      </div>
    );
  };

  return (
    <div className="header_container">
      <Logo />
      <InputBox />
    </div>
  );
}
export default Header;
