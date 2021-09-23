import React, { useState } from "react";

function Header({ setNickNamae_in_footer }) {
  const [input, setInput] = useState("");

  // Components //
  const InputBox = () => {
    return <input autoFocus type="text" value={input} onChange={onChange} />;
  };

  const SearchButton = () => {
    return <button onClick={handleSearchButton}> search </button>;
  };

  ////////////////

  //inputbox change handler
  const onChange = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handleSearchButton = () => {
    setNickNamae_in_footer(input);
  };

  return (
    <div>
      <InputBox />
      <SearchButton />
    </div>
  );
}
export default Header;
