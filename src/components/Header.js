import React, { useEffect, useState } from "react";

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
      <div>
        <input
          type="text"
          name="nickName"
          value={input}
          onChange={onChange}
          spellCheck={false}
        />
        <button onClick={handleSearchButton}> search </button>
      </div>
    );
  };

  return (
    <div>
      <InputBox />
    </div>
  );
}
export default Header;
