import React from 'react';
import Board from "./components/Board";
import style from "./App.module.scss";

function App() {

  return (
    <main className={style.main}>
      <h1>Tic Tac Toe with React!</h1>
      <Board />
    </main>
  );
}

export default App;
