import React, { useEffect, useRef, useState } from "react";
import styles from "./card-list.module.scss";
import Card from "../card/Card";
import { usePokemonBattle } from "../../context/PokemonBattleContext";
import Button from "../../ui/button/Button";
import { useAuth } from "../../context/AuthContext";

const CardList = () => {
  const {
    pokemons,
    fetchPokemons,
    selectedPokemon,
    setSelectedPokemon,
    handleStartGame,
  } = usePokemonBattle();

  const { user } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!pokemons.length) {
      fetchPokemons(currentPage);
    }
  }, [pokemons, currentPage]);

  const loadMorePokemons = async () => {
    setIsLoading(true);
    await fetchPokemons(currentPage + 1);
    setCurrentPage((prev) => prev + 1);
    setIsLoading(false);

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  return (
    <div className={styles.cardList}>
      <div className={styles.cardListPokemons} ref={containerRef}>
        {!!pokemons.length &&
          pokemons.map((pokemon) => (
            <div
              key={pokemon.pokemon_id}
              onClick={() => {
                setSelectedPokemon(pokemon);
              }}
            >
              <Card
                withActions
                pokemon={pokemon}
                isSelected={pokemon.pokemon_id === selectedPokemon?.pokemon_id}
              />
            </div>
          ))}
      </div>

      <div className={styles.cardListActions}>
        <Button
          text="Load More"
          disabled={isLoading}
          onClick={loadMorePokemons}
        />
        <Button
          text="Start"
          disabled={!selectedPokemon}
          onClick={() => handleStartGame(user?._id)}
        />
      </div>
    </div>
  );
};

export default CardList;
