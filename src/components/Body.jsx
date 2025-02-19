import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import "../styles/body.css";

const Body = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [activeButton, setActiveButton] = useState("gen1");
  const [showDisplay, setShowDisplay] = useState(false);
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [showFrontSprite, setShowFrontSprite] = useState(true);

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
    setActiveButton(e.target.value);
  };

  const getPokemonDescription = (e) => {
    setShowDisplay(true);

    const card = e.currentTarget;
    const idElement = card.querySelector(".pokemon-id");
    const pokemonId = idElement?.textContent.trim();
    const currentPokemon = pokemons.find((p) => p.id.toString() === pokemonId);
    setPokemonDetails(currentPokemon);
    console.log(currentPokemon);
  };

  useEffect(() => {
    fetchPokemons();
  }, [activeButton]);

  useEffect(() => {
    if (showDisplay) {
      const interval = setInterval(() => {
        setShowFrontSprite((prev) => !prev);
      }, 2000); // Alterna a cada 2 segundos

      return () => clearInterval(interval);
    }
  }, [showDisplay]);

  if (loading || !isReady) {
    return <Loading />;
  }

  return (
    <div className="body-container">
      {showDisplay && (
        <div
          onClick={() => setActiveButton(setShowDisplay)}
          className="pokemon-descripiton-container"
        >
          <div className="pokemon-modal">
            <button
              className="modal-button"
              onClick={() => setActiveButton(setShowDisplay)}
            >
              X
            </button>
            <h2>{pokemonDetails.name}</h2>
            <img
              className="modal-sprit"
              src={
                showFrontSprite
                  ? pokemonDetails.sprites.front_default
                  : pokemonDetails.sprites.back_default
              }
              alt={pokemonDetails.name}
            />
            <div className="pokemon-abilities">
              <p>
                <span>abilities: </span>
                {pokemonDetails.abilities
                  .map((ability) => ability.ability.name)
                  .join(" / ")}
              </p>
            </div>
            <div className="status-area">
              <h2>Base status:</h2>
              <table className="pokemon-status">
                <tbody>
                  <tr className="status-row">
                    <th className="status-name">Hp:</th>
                    <td className="status-value">
                      {pokemonDetails.stats[0].base_stat}
                    </td>
                    <td className="cell-barchart">
                      <div
                        className="barchart-midle"
                        style={{
                          width: `${
                            (pokemonDetails.stats[0].base_stat / 255) * 100
                          }%`,
                        }}
                      ></div>
                    </td>
                  </tr>
                  <tr>
                    <th className="status-name">Atk:</th>
                    <td className="status-value">
                      {pokemonDetails.stats[1].base_stat}
                    </td>
                    <td className="cell-barchart">
                      <div
                        className="barchart-midle"
                        style={{
                          width: `${
                            (pokemonDetails.stats[1].base_stat / 255) * 100
                          }%`,
                        }}
                      ></div>
                    </td>
                  </tr>
                  <tr>
                    <th className="status-name">Def:</th>
                    <td className="status-value">
                      {pokemonDetails.stats[2].base_stat}
                    </td>
                    <td className="cell-barchart">
                      <div
                        className="barchart-midle"
                        style={{
                          width: `${
                            (pokemonDetails.stats[2].base_stat / 255) * 100
                          }%`,
                        }}
                      ></div>
                    </td>
                  </tr>
                  <tr>
                    <th className="status-name">SpAtk:</th>
                    <td className="status-value">
                      {pokemonDetails.stats[3].base_stat}
                    </td>
                    <td className="cell-barchart">
                      <div
                        className="barchart-midle"
                        style={{
                          width: `${
                            (pokemonDetails.stats[3].base_stat / 255) * 100
                          }%`,
                        }}
                      ></div>
                    </td>
                  </tr>
                  <tr>
                    <th className="status-name">SpeDef:</th>
                    <td className="status-value">
                      {pokemonDetails.stats[4].base_stat}
                    </td>
                    <td className="cell-barchart">
                      <div
                        className="barchart-midle"
                        style={{
                          width: `${
                            (pokemonDetails.stats[4].base_stat / 255) * 100
                          }%`,
                        }}
                      ></div>
                    </td>
                  </tr>
                  <tr>
                    <th className="status-name">Speed:</th>
                    <td className="status-value">
                      {pokemonDetails.stats[5].base_stat}
                    </td>
                    <td className="cell-barchart">
                      <div
                        className="barchart-midle"
                        style={{
                          width: `${
                            (pokemonDetails.stats[5].base_stat / 255) * 100
                          }%`,
                        }}
                      ></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

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
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={getPokemonDescription}
          >
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
