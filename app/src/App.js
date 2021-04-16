import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Map from "./components/Map";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AuthProvider from "./contexts/AuthContext";
//import AuthenticatedRoute from "./hocs/AuthenticatedRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Nav />
          <Route path="/" exact component={Map} />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
