import React from "react";

import "../styles/footer.css";

export default function About() {
  return (
    <footer>
      <div className="copy">
        <p>Copyright &copy; 2025</p>
      </div>
      <div className="about">
        <p>
          Created by:
          <a href="https://github.com/IOelinton">
            <h2>https://github.com/IOelinton</h2>
          </a>
        </p>
        <p>
          used api:
          <a href="https://pokeapi.co/">
            <h2>https://pokeapi.co/</h2>
          </a>
        </p>
      </div>
    </footer>
  );
}
