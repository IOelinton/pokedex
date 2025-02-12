import React from "react";

import "../styles/header.css";
import search from "../icons/search.png";

export default function Header() {
  return (
    <header>
      <div className="header-content">
        <h1>Pokédex</h1>
        <div className="header-right">
          <input type="text" placeholder="Search" />
          <button>
            <img src={search} alt="search-icon" />
          </button>
        </div>
      </div>
    </header>
  );
}
