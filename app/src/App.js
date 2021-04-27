import "./App.css";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import { Suspense } from "react";
import { Provider } from "jotai";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <AuthProvider>
            <Nav />
            <Route path="/" exact component={Home} />
          </AuthProvider>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
