import "./App.css";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import ChatroomProvider from "./contexts/ChatroomContext";
import ChatProvider from "./contexts/ChatContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ChatroomProvider>
            <ChatProvider>
              <Nav />
              <Route path="/" exact component={Home} />
            </ChatProvider>
          </ChatroomProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
