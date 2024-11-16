import React from "react";
import styles from "./button.module.scss";

const Button = ({ text, onClick, disabled }) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
