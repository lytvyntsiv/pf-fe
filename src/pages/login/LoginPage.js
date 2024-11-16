import React, { useState } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../api/auth";
import styles from "./login.module.scss";
import Button from "../../ui/button/Button";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const web3 = new Web3(window.ethereum);

  const connectMetamask = async () => {
    try {
      setLoading(true);
      const accounts = await web3.eth.requestAccounts();
      const userAddress = accounts[0];
      await authenticate(userAddress);
    } catch (error) {
      setErrorMessage("Error connecting to Metamask");
    } finally {
      setLoading(false);
    }
  };

  const authenticate = async (userAddress) => {
    try {
      const nonce = await AuthService.getNonce(userAddress);

      const message = `Sign this message to login: ${nonce}`;

      const signature = await web3.eth.personal.sign(message, userAddress, "");

      const response = await AuthService.login(userAddress, signature, message);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setErrorMessage("Authentication failed");
      }
    } catch (error) {
      setErrorMessage("Error during authentication");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <h2 className={styles.loginFormTitle}>Login with Metamask</h2>

        <Button
          text={loading ? "Connecting..." : "Connect with Metamask"}
          disabled={loading}
          onClick={connectMetamask}
        />
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
