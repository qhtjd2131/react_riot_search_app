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
      if (input.length > 0 && input.length < 3) {
        const result = input.split("").join(" ");
        setNickNamae_in_header(""); //같은 소환사 닉네임을 검색 하더라도 usestate를 변경해 rerendering 하기위해
        setNickNamae_in_header(result.toLowerCase());
        setInput("");
      } else {
        setNickNamae_in_header(""); //같은 소환사 닉네임을 검색 하더라도 usestate를 변경해 rerendering 하기위해
        setNickNamae_in_header(input.toLowerCase());
        setInput("");
      }
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
