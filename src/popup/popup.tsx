import React, { useState } from "react";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Page from "../components/Page";

export function App() {
  return (
    <div className='test'>
      <Header />
      <Page />
      <Footer />
    </div>
  );
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg == "to-popup") {
    console.log("working");
    sendResponse(1);
  }
});
