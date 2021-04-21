import "./App.css";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Nav />
          <Route path="/" exact component={Home} />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
