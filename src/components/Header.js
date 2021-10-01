import React, { useState } from "react";
import "./Header.css";

function Header({ setNickNamae_in_header }) {
  const InputBox = () => {
    const [input, setInput] = useState("");
    const onChange = (e) => {
      setInput(e.target.value);
    };

    const handleSearchButton = () => {
      setNickNamae_in_header(input);
      setInput("");
    };
    return (
      <div className="header_container">
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

  return <InputBox />;
}
export default Header;
