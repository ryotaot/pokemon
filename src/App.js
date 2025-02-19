import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/Pokemon.js";
import Card from "./components/Card.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setloading] = useState(true);
  const [_pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      /* 全てのポケモンデータを取得*/
      let res = await getAllPokemon(initialURL);
      /*各ポケモンの詳細なデータを取得*/
      loadPokemon(res.results);
      setNextURL(res.next);
      setloading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  console.log(_pokemonData);

  const handleNextPage = async () => {
    setloading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setloading(false);
  };

  const handlePrevPage = () => {};

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <>
            <div className="ContpokemonCardainer">
              {_pokemonData.map((pokemon, index) => {
                return <Card key={index} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
