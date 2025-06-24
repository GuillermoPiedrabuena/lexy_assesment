import React, { useState, useEffect } from "react";
import { apiRequest } from "../services/apiService";

export default function PokemonSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    apiRequest("GET", "https://pokeapi.co/api/v2", "/pokemon?limit=1000")
      .then((data) => setAllPokemon(data.results.map((p) => p.name)));
  }, []);

  useEffect(() => {
    if (query.length === 0) {
      setSuggestions([]);
      return;
    }
    setSuggestions(
      allPokemon.filter((name) =>
        name.toLowerCase().startsWith(query.toLowerCase())
      ).slice(0, 10)
    );
  }, [query, allPokemon]);

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        className="border rounded p-2 w-full"
        placeholder="Buscar Pokémon por nombre..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full z-10 max-h-48 overflow-y-auto">
          {suggestions.map((name) => (
            <li
              key={name}
              className="p-2 hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                onSelect(name);
                setQuery(name);
                setSuggestions([]);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}