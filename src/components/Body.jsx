import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import "../styles/body.css";

const Body = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [activeButton, setActiveButton] = useState("gen1");

  const fetchPokemons = async () => {
    const genConfig = {
      gen1: { offset: 0, limit: 151 },
      gen2: { offset: 151, limit: 100 },
      gen3: { offset: 251, limit: 135 },
      gen4: { offset: 386, limit: 108 },
      gen5: { offset: 494, limit: 155 },
      gen6: { offset: 649, limit: 72 },
      gen7: { offset: 721, limit: 88 },
      gen8: { offset: 810, limit: 95 },
      gen9: { offset: 905, limit: 120 },
    };

    try {
      setLoading(true);
      setIsReady(false);

      const { offset, limit } = genConfig[activeButton];
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

      const response = await fetch(url);
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );

      setPokemons(pokemonDetails);
      setLoading(false);
      setTimeout(() => setIsReady(true), 500);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      setLoading(false);
      setIsReady(true);
    }
  };

  const handleDex = (e) => {
    // const buttons = document.querySelectorAll(".button-area button");
    // buttons.forEach((button) => button.classList.remove("active"));
    // e.target.classList.add("active");
    setActiveButton(e.target.value);
  };

  useEffect(() => {
    fetchPokemons();
  }, [activeButton]);

  if (loading || !isReady) {
    return <Loading />;
  }

  return (
    <div className="body-container">
      <nav className="button-area">
        <button
          value="gen1"
          onClick={handleDex}
          className={activeButton === "gen1" ? "active" : ""}
        >
          gen 1
        </button>
        <button
          value="gen2"
          onClick={handleDex}
          className={activeButton === "gen2" ? "active" : ""}
        >
          gen 2
        </button>
        <button
          value="gen3"
          onClick={handleDex}
          className={activeButton === "gen3" ? "active" : ""}
        >
          gen 3
        </button>
        <button
          value="gen4"
          onClick={handleDex}
          className={activeButton === "gen4" ? "active" : ""}
        >
          gen 4
        </button>
        <button
          value="gen5"
          onClick={handleDex}
          className={activeButton === "gen5" ? "active" : ""}
        >
          gen 5
        </button>
        <button
          value="gen6"
          onClick={handleDex}
          className={activeButton === "gen6" ? "active" : ""}
        >
          gen 6
        </button>
        <button
          value="gen7"
          onClick={handleDex}
          className={activeButton === "gen7" ? "active" : ""}
        >
          gen 7
        </button>
        <button
          value="gen8"
          onClick={handleDex}
          className={activeButton === "gen8" ? "active" : ""}
        >
          gen 8
        </button>
        <button
          value="gen9"
          onClick={handleDex}
          className={activeButton === "gen9" ? "active" : ""}
        >
          gen 9
        </button>
      </nav>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h3 className="pokemon-id"> {pokemon.id} </h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <h2 className={`pokemon-type ${pokemon.types[0].type.name}`}>
              {pokemon.types.map((typeInfo) => typeInfo.type.name).join(" / ")}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
