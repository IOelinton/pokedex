import React, { useState } from "react";

import "../styles/header.css";
import search from "../icons/search.png";

export default function Header() {
  const [searchInput, setSearchInput] = useState("");

  const handleRedirect = () => {
    console.log("Searching for:", searchInput);
  };

  return (
    <header>
      <div className="header-content">
        <h1>Pokédex</h1>
        {/* <div className="header-right">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRedirect();
              }
            }}
          />
          <button onClick={handleRedirect}>
            <img src={search} alt="search-icon" />
          </button>
        </div> */}
      </div>
    </header>
  );
}
