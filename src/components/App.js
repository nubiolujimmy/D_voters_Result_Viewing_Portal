//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


function App() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    const checkForMetaMask = async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        alert('Good Metamask is Installed.');
      } else {
        alert('Please install MetaMask.');
      }
    };

    checkForMetaMask();
  }, []);


}

export default App;
