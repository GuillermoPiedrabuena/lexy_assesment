import { NavLink } from "react-router-dom";
import Lottie from "lottie-react";
import pokeballAnimation from "../assets/pockeball.json";

export default function Navbar() {
  return (
    <nav
      className="flex items-center gap-4 p-4 bg-white shadow mb-6"
      style={{
        position: "relative",
        zIndex: 10, // Asegura que esté sobre el fondo
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div className="w-10 h-10 flex-shrink-0">
        <Lottie animationData={pokeballAnimation} loop={true} />
      </div>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-blue-600 underline"
            : "text-gray-700"
        }
        end
      >
        Archivos
      </NavLink>
      <NavLink
        to="/pokemon"
        className={({ isActive }) =>
          isActive
            ? "font-bold text-blue-600 underline"
            : "text-gray-700"
        }
      >
        Pockedex
      </NavLink>
    </nav>
  );
}