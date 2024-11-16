import React, { useEffect, useRef } from "react";

import styles from "./log-board.module.scss";
import { usePokemonBattle } from "../../context/PokemonBattleContext";

const LogBoard = () => {
  const { battleLog } = usePokemonBattle();
  const boardListRef = useRef(null);

  useEffect(() => {
    if (boardListRef.current) {
      boardListRef.current.scrollTop = boardListRef.current.scrollHeight;
    }
  }, [battleLog]);

  return (
    <div className={styles.board}>
      <div className={styles.boardList} ref={boardListRef}>
        {battleLog?.map((el, index) => (
          <p key={index} className={styles.boardListItem}>
            > {el}
          </p>
        ))}
      </div>
    </div>
  );
};

export default LogBoard;
