import React, { useState } from "react";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";
import "./App.css";

function App() {
  const [nickName, setNickName] = useState("");
  const setNickNamae_in_header = (nickName) => {
    setNickName(nickName);
  };

  return (
    <div className="app">
      <div className="header_container">
        <Header setNickNamae_in_header={setNickNamae_in_header} />
      </div>
      <div className="main_container">
        <Main nickName={nickName} />
      </div>
      <div className="footer_container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
