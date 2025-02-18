import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon } from "./utils/Pokemon.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);
      console.log(res);
      setloading(false);
    };
    fetchPokemonData();
  }, []);
  return (
    <div className="App">
      {loading ? (
        <h1>ロード中</h1>
      ) : (
        <>
          <h1>ポケモンデータを取得しました</h1>
        </>
      )}
    </div>
  );
}

export default App;
