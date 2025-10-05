import { useState } from "react";

export default function Sidebar(props) {
  const handleChange = (e) => {
    props.setRadius(Number(e.target.value)); // ensure it's a number
    console.log(e.target.value);
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">MENU</h2>
      <ul>
        <li>
          <span className="icon">📄</span>
          <select className="input">
            <option value="Comida">Comida</option>
            <option value="Automotriz">Automotriz</option>
            <option value="Cervecera">Cervecera</option>
            <option value="Textil">DataCenter</option>
          </select>
        </li>
        <li>
          <span className="icon">💲</span>
          <input type="number" placeholder="Inversion" min={0} max={10000000000} className="Des" />
        </li>
      </ul>

      <div className="slider-section">
        <label htmlFor="projection">Radio</label>
        <input
          id="projection"
          type="range"
          min="1000"
          max="100000"
          onChange={handleChange}  // fixed!
          value={props.radius || 1} // default to 1 if undefined
        />
        <div className="description">Descripción</div>
      </div>
    </aside>
  );
}
