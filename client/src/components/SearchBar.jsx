import  React from "react"
import { useState } from "react";
import { obtenerPaisesNombre } from "../redux/Action";
import { useDispatch } from "react-redux";

import styles from "./SearchBar.module.css";

function SearchBar() {
  const [name, setName] = useState("");
  const [buscador, setBuscador] = useState("");

  const dispatch = useDispatch();

  function handleInput(e) {
    e.preventDefault(e);
    setName(e.target.value);
    setBuscador("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(obtenerPaisesNombre(name));
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input className={styles.input}
          type="text"
          placeholder="Search country"
          onChange={(e) => handleInput(e)}
        />
        <button className={styles.btna}/* onSubmit={(e) => handleSubmit(e)} */>Send</button>
      </form>
    </div>
  );
}

export default SearchBar;