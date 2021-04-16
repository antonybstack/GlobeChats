import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Map from "./components/Map";
import CreateEvent from "./components/CreateEvent";
import CreateButtons from "./components/CreateButtons";
import { useState } from 'react';

function App() {

  return (
    <div className="App">
      <Nav />
      <Map />
      <CreateButtons />
    </div>
  );
}

export default App;
