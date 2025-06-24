import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import PokemonSearch from "../components/PokemonSearch";
import PokemonDetails from "../components/PokemonDetails";
import { useState } from "react";

export default function PokemonView() {
  const [selected, setSelected] = useState(null);
  return (
    <div>
      <div className="inline-block bg-white rounded shadow px-4 py-2 mb-4">
        <h2 className="text-2xl font-bold flex items-center gap-2 m-0">
          <CatchingPokemonIcon fontSize="large" />
          Búsqueda de Pokémon
        </h2>
      </div>
      <PokemonSearch onSelect={setSelected} />
      {selected && <PokemonDetails name={selected} />}
    </div>
  );
}