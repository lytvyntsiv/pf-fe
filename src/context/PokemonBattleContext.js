import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { PokemonService } from "../api/pokemon";
import { BATTLE_TYPE } from "../constants/battle-type.enum";
import { PLAYER_TYPE } from "../constants/player.enum";

const PokemonBattleContext = createContext();

export const PokemonBattleProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [computerPokemon, setComputerPokemon] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [isEndGame, setIsEndGame] = useState(false);
  const [playerHP, setPlayerHP] = useState(null);
  const [computerHP, setComputerHP] = useState(null);
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const baseUrl = process.env.REACT_APP_WS_BASE_URL;

  const fetchPokemons = async (page) => {
    try {
      const res = await PokemonService.getAll(page);
      if (res) {
        setPokemons((prev) => [...prev, ...res.pokemons]);
      }
    } catch (error) {
      console.error("Failed to fetch pokemons:", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleConnectSocket = useCallback((user_id) => {
    const ws = new WebSocket(baseUrl);
    setSocket(ws);

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
      ws.send(
        JSON.stringify({
          type: "connect",
          data: { user_id },
        }),
      );
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, []);

  const attack = (user_id) => {
    if (!socket) return;

    setIsPlayerTurn((prevTurn) => !prevTurn);
    socket.send(
      JSON.stringify({
        type: "attack",
        data: {
          user_id,
          attacker: { pokemon_id: selectedPokemon?.pokemon_id },
          defender: { pokemon_id: computerPokemon?.pokemon_id },
          playerHP,
          computerHP,
        },
      }),
    );
  };

  const handleStartGame = (user_id) => {
    if (!socket || !selectedPokemon) return;

    setIsGameStarted(true);
    setPlayerHP(selectedPokemon.base.HP);
    setBattleLog(["Connect to server, game started!"]);

    socket.send(
      JSON.stringify({
        type: "start-game",
        data: {
          user_id,
          pokemon: selectedPokemon,
        },
      }),
    );
  };

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const parsedEvent = JSON.parse(event.data);

      const { type, data } = parsedEvent;

      if (type === BATTLE_TYPE.START_GAME) {
        setComputerPokemon(data.pokemon);
        setComputerHP(data.pokemon.base.HP);

        setIsPlayerTurn(data.firstTurn === PLAYER_TYPE.USER);
      }

      if (type === BATTLE_TYPE.BATTLE_UPDATE) {
        const isComputerAttacker = data.attacker_type === PLAYER_TYPE.COMPUTER;

        setIsPlayerTurn(!!isComputerAttacker);

        if (data?.end_game) {
          setIsEndGame(true);
        }

        if (isComputerAttacker) {
          setPlayerHP((prev) =>
            prev - data.damage <= 0 ? 0 : prev - data.damage,
          );
        } else {
          setComputerHP((prev) =>
            prev - data.damage <= 0 ? 0 : prev - data.damage,
          );
        }

        setBattleLog((prev) => [...prev, data.log]);
      }
    };
  }, [socket]);

  return (
    <PokemonBattleContext.Provider
      value={{
        computerPokemon,
        battleLog,
        isPlayerTurn,
        playerHP,
        computerHP,
        pokemons,
        selectedPokemon,
        setSelectedPokemon,
        isGameStarted,
        setIsGameStarted,
        isEndGame,
        handleStartGame,
        fetchPokemons,
        attack,
        handleConnectSocket,
      }}
    >
      {children}
    </PokemonBattleContext.Provider>
  );
};

export const usePokemonBattle = () => useContext(PokemonBattleContext);
