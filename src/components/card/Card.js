import React from "react";

import styles from "./card.module.scss";
import classNames from "classnames";

const Card = ({ pokemon, isSelected, withActions }) => {
  return (
    <div
      className={classNames(styles.card, withActions && styles.cardActions)}
      style={{ borderColor: isSelected ? "red" : "" }}
    >
      <div className={styles.cardHeader}>
        <span>{pokemon.name?.english}</span>
      </div>
      <div className={styles.cardImageContainer}>
        <img
          src={pokemon.image.hires}
          alt={pokemon.name.english}
          className={styles.cardImage}
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardContentType}>
          Type: {pokemon.type.join(", ")}
        </p>
        <div className={styles.cardContentStats}>
          <p>HP: {pokemon.base.HP}</p>
          <p>Attack: {pokemon.base.Attack}</p>
          <p>Defense: {pokemon.base.Defense}</p>
          <p>Speed: {pokemon.base.Speed}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
