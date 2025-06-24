import React from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FileManagerView from "./views/FileManagerView";
import PokemonView from "./views/PokemonView";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-2" style={{ position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<FileManagerView />} />
          <Route path="/pokemon" element={<PokemonView />} />
        </Routes>
      </div>
    </>
  );
}

export default App;