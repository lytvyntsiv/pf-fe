import React, { useEffect } from "react";

import styles from "./dashboard.module.scss";
import CardList from "../../components/card-list/CardList";
import FightArena from "../../components/fight-arena/FightArena";
import classNames from "classnames";
import { usePokemonBattle } from "../../context/PokemonBattleContext";
import { useAuth } from "../../context/AuthContext";

const DashboardPage = () => {
  const { selectedPokemon, isGameStarted, handleConnectSocket } =
    usePokemonBattle();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      handleConnectSocket(user?._id);
    }
  }, [user]);

  return (
    <div
      className={classNames(
        styles.dashboard,
        isGameStarted && styles.dashboardFigthMode,
      )}
    >
      {!isGameStarted ? (
        <div className={styles.dashboardPockemons}>
          <CardList />
        </div>
      ) : (
        <FightArena />
      )}
    </div>
  );
};

export default DashboardPage;
