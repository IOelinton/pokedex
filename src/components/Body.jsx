import { useState, useEffect } from "react";
import Loading from "./Loading.jsx";
import "../styles/body.css";

const Body = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setIsReady(false);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=1025"
      );
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemons(pokemonDetails);
      setLoading(false);

      setTimeout(() => {
        setIsReady(true);
      }, 500);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      setLoading(false);
      setIsReady(true);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  if (loading || !isReady) {
    return <Loading />;
  }

  return (
    <div className="body-container">
      <p>
        <h2>Nacional Dex</h2>
      </p>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <h3 className="pokemon-id"> {pokemon.id} </h3>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3 className="pokemon-name">{pokemon.name}</h3>
            <h2 className="pokemon-type">
              {pokemon.types.map((typeInfo) => typeInfo.type.name).join(" / ")}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
