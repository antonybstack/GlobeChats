import "./App.css";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import ChatroomProvider from "./contexts/ChatroomContext";
import ChatProvider from "./contexts/ChatContext";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ChatProvider>
            <Nav />
            <Route path="/" exact component={Map} />
          </ChatProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
