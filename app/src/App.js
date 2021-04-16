import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import Map from "./components/Map";
import CreateEvent from "./components/CreateEvent";
import CreateButtons from "./components/CreateButtons";
import { useState } from "react";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Chatroom from "./components/Chatroom";
import FriendsList from "./components/FriendsList";
import AuthProvider from "./contexts/AuthContext";
import ChatProvider from "./contexts/ChatContext";
import ProfileButton from "./components/ProfileButton";
//import AuthenticatedRoute from "./hocs/AuthenticatedRoute";
import { BrowserRouter as Router, Route } from "react-router-dom";

const friend = [
  { id: 1, name: "Roderick" },
  { id: 2, name: "Matt" },
  { id: 3, name: "Antony" },
  { id: 4, name: "Josh" },
  { id: 5, name: "Tony" },
  { id: 6, name: "Anna" },
];

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ChatProvider>
            <ProfileButton/>
            <Nav />
            <CreateButtons />
            <FriendsList friend={friend} />
            <Route path="/" exact component={Map} />
          </ChatProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
