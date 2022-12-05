import React from "react";
import style from './Tile.module.scss';

const Tile = ({ playerValue, onClick, index, disabled }) => (
  <div className={style.tile}>
    <button onClick={() => onClick(index)} disabled={disabled}>{playerValue}</button>
  </div>
);

export default Tile;
