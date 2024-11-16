import React from "react";

import styles from "./fight-arena.module.scss";
import Card from "../card/Card";
import { usePokemonBattle } from "../../context/PokemonBattleContext";
import LogBoard from "../log-board/LogBoard";
import Button from "../../ui/button/Button";
import { useMediaQuery } from "react-responsive";
import HpLine from "../hp-line/HpLine";
import { useAuth } from "../../context/AuthContext";

const FightArena = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { user } = useAuth();

  const {
    selectedPokemon,
    computerPokemon,
    attack,
    isPlayerTurn,
    playerHP,
    computerHP,
    isEndGame,
  } = usePokemonBattle();

  return (
    <div className={styles.arena}>
      <div className={styles.arenaFight}>
        <LogBoard />

        {isMobile && (
          <div className={styles.arenaAttackButton}>
            <Button
              text={isEndGame ? "New Game" : "Attack!"}
              onClick={() => {
                !isEndGame ? attack(user._id) : window.location.reload();
              }}
              disabled={!isPlayerTurn}
            />
          </div>
        )}
      </div>
      <div className={styles.arenaPlayer}>
        <HpLine hp={playerHP} />
        <Card pokemon={selectedPokemon} />
      </div>
      {!isMobile && (
        <div className={styles.arenaAttackButton}>
          <Button
            text={isEndGame ? "New Game" : "Attack!"}
            onClick={() => {
              !isEndGame ? attack(user._id) : window.location.reload();
            }}
            disabled={!isPlayerTurn}
          />
        </div>
      )}
      {computerPokemon && (
        <div className={styles.arenaPlayer}>
          <HpLine hp={computerHP} />
          <Card pokemon={computerPokemon} />
        </div>
      )}
    </div>
  );
};

export default FightArena;
