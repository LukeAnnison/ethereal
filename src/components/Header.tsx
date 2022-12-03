// header component
import React, { useEffect, useState, useContext } from "react";
import ToggleSwitch from "./ToggleSwitch";
import { PageContext} from "../contexts/pageContext";
import { badgeStakingOff, badgeStakingOn } from "../utils/extension";
const createMetaMaskProvider = require("metamask-extension-provider");
const provider = createMetaMaskProvider();

const Header = () => {
  const [initialToggle, setInitialToggle] = useState(null);
  const { page, setPage } = useContext(PageContext);
  const [connected, setConnected] = useState(false);

  function handleToggleMessage(toggle) {
    if (toggle) {
      chrome.runtime.sendMessage({ toggle: "toggleOn" });
    } else {
      chrome.runtime.sendMessage({ toggle: "toggleOff" });
    }
  }

  const isConnected = async () => {
    if (provider.selectedAddress) {
      setConnected(true);
      chrome.storage.local.set({ connected: true });
    } else {
      setConnected(false);
      chrome.storage.local.set({ connected: false });
    }
  };

  useEffect(() => {
    if (provider.selectedAddress) {
        isConnected()
    }else {
      setTimeout(isConnected, 250)
    }
      
  }, []);


  const handleInitialState = () => {
    chrome.storage.local.get(["toggle"], (result) => {
      setInitialToggle(result.toggle);
      if (!result.toggle) {
        setPage("stakingOff");
      }
    });
    chrome.storage.local.get(["connected"], (result) => {
      setConnected(result.connected);
    } );

  };

  handleInitialState();

  const handleToggle = async () => {
    chrome.storage.local.get(["toggle"], (result) => {
      if (chrome.runtime.lastError) console.log(chrome.runtime.lastError);

      if (result.toggle) {
        chrome.storage.local.set({ ["toggle"]: false });
        handleToggleMessage(false);
        setPage("stakingOff");
        badgeStakingOff();
      } else {
        chrome.storage.local.set({ ["toggle"]: true });
        handleToggleMessage(true);
        setPage("earnings");
        badgeStakingOn();
      }
    });
  };

  return (
    <header className="header">
      <div className="left-header">
        <img
          id="logo"
          width="20px"
          height="20px"
          src="public/ethereal-logo.svg"
          alt="Ethereal"
        ></img>
        {connected ?  <><div className="ellipse-connected"></div><p>Connected</p></>: <><div className="ellipse-disconnected"></div><p>Connect Wallet</p></>}
      </div>
      <div className="right-header">
        <p className="header-staking">Staking: </p>
        <ToggleSwitch
          page={page}
          handleToggle={handleToggle}
          initialToggle={initialToggle}
          setInitialToggle={setInitialToggle}
        />
      </div>
    </header>
  );
};

export default Header;
