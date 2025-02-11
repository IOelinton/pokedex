import React from "react";

export default function Header() {
  return (
    <header>
      <div className="header-left">
        <div>Pokedex</div>
      </div>
      <div className="header-right">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
    </header>
  );
}
