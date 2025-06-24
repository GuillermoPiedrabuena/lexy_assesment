import React, { useEffect, useState } from "react";
import { apiRequest } from "../services/apiService";

// Colores para los tipos de Pokémon
const typeColors = {
  normal: "bg-gray-400 text-white",
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  electric: "bg-yellow-400 text-black",
  grass: "bg-green-500 text-white",
  ice: "bg-cyan-300 text-black",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-indigo-300 text-black",
  psychic: "bg-pink-400 text-white",
  bug: "bg-lime-600 text-white",
  rock: "bg-yellow-800 text-white",
  ghost: "bg-indigo-800 text-white",
  dragon: "bg-indigo-700 text-white",
  dark: "bg-gray-800 text-white",
  steel: "bg-gray-500 text-white",
  fairy: "bg-pink-300 text-black",
};

export default function PokemonDetails({ name }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    apiRequest("GET", "https://pokeapi.co/api/v2", `/pokemon/${name}`)
      .then(setData);
  }, [name]);

  if (!data) return <div className="text-gray-500">Cargando...</div>;

  // Extraer stats principales
  const attack = data.stats.find((s) => s.stat.name === "attack")?.base_stat;
  const defense = data.stats.find((s) => s.stat.name === "defense")?.base_stat;

  return (
    <div className="bg-white rounded shadow p-6 max-w-md mx-auto mt-6">
      <div className="flex items-center gap-6 mb-4">
        <img
          src={data.sprites.front_default}
          alt={data.name}
          className="w-24 h-24"
        />
        <div>
          {/* Nombre grande */}
          <h3 className="text-3xl font-extrabold capitalize mb-2">{data.name}</h3>
          {/* Tipos como badges */}
          <div className="flex gap-2 mb-2">
            {data.types.map((t) => (
              <span
                key={t.type.name}
                className={`px-3 py-1 rounded-full text-sm font-semibold capitalize shadow ${typeColors[t.type.name] || "bg-gray-300"}`}
              >
                {t.type.name}
              </span>
            ))}
          </div>
          {/* Ataque y defensa en grande */}
          <div className="flex gap-4 mt-2">
            <div className="text-lg font-bold text-gray-700">
              Ataque: <span className="text-2xl">{attack}</span>
            </div>
            <div className="text-lg font-bold text-gray-700">
              Defensa: <span className="text-2xl">{defense}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Resto de datos secundarios */}
      <div className="text-sm text-gray-600 mt-4">
        <div>
          <span className="font-semibold">Altura:</span> {(data.height / 10).toFixed(1)} m
        </div>
        <div>
          <span className="font-semibold">Peso:</span> {(data.weight / 10).toFixed(1)} kg
        </div>
        <div>
          <span className="font-semibold">Habilidades:</span>{" "}
          {data.abilities.map((a) => a.ability.name).join(", ")}
        </div>
        <div className="mt-2">
          <span className="font-semibold">Estadísticas base:</span>
          <ul className="ml-4 list-disc">
            {data.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}