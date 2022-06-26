import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import "./App.css";
import abi from "./utils/DeBlock.json";
import AppContent from "./components/AppContent";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";

function App() {
  // Setting Account
  const [currentAccount, setCurrentAccount] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [counter, setCounter] = useState(true);
  const contractAddress = "0x2554030E27cd0Ef0D056F0Dcb6915bB3658B6Bd4";
  const contractABI = abi.abi;

  // Checks Wallet and gets Account
  const checkIfWalletConnect = async () => {
    const { ethereum } = window;

    try {
      if (!ethereum) {
        console.log("Make sure you have metamask");
      } else {
        console.log("We have an ethereum obj", ethereum);
        // Check if we can authorize a user
        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("An account has been found: ", account);

          setCurrentAccount(account);
        } else {
          console.log("No account");
        }
        // Get all Posts
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const DeBlockContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let posts = await DeBlockContract.getAllPosts();
        setAllPosts(posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Connect Wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Ethereum Hoe");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts[0]);

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  // Post Content
  const addPost = async (message) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const DeBlockContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let postTxn = await DeBlockContract.addPost(message);
        console.log(postTxn);
        console.log("mining", postTxn.hash);
        setCounter(false);

        let result = await postTxn.wait();
        if (result) {
          console.log("mined", postTxn.hash);
          setCounter(true);
          reloadPost(ethereum);
        }
      } else {
        console.log("No Ethereum");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const reloadPost = async (ethereum) => {
    // Get all Posts
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const DeBlockContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    let posts = await DeBlockContract.getAllPosts();
    setAllPosts(posts);
  };

  useEffect(() => {
    checkIfWalletConnect();
  }, []);

  return (
    <div className="App">
      {currentAccount ? (
        <div>
          <AppHeader _currentAccount={currentAccount} />

          <AppContent
            _currentAccount={currentAccount}
            _addPost={addPost}
            _allPosts={allPosts}
            _counter={counter}
          />

          <AppFooter />
        </div>
      ) : (
        <div>
          <h2>Hello World</h2>
          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
      )}
    </div>
  );
}

export default App;
