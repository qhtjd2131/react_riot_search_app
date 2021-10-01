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
      <Header setNickNamae_in_header={setNickNamae_in_header} />
      <Main nickName={nickName} />
      <Footer />
    </div>
  );
}

export default App;
