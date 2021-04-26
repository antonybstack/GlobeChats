import "./App.css";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import ProfileAtomTest from "./components/ProfileAtomTest";
import {Suspense} from 'react';

function App() {
  return (
    <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <ProfileAtomTest />
        </Suspense>
    </div>
  );
}

export default App;
