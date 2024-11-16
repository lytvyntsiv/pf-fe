import React from "react";

import styles from "./hp-line.module.scss";

const HpLevel = ({ hp }) => {
  return (
    <div className={styles.hpLevel}>
      <p className={styles.hpLevelHp}>HP: {hp}</p>
    </div>
  );
};

export default HpLevel;
