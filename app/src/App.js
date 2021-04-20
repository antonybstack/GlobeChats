import "./App.css";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import ChatroomProvider from "./contexts/ChatroomContext";
import ChatProvider from "./contexts/ChatContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import Home from "./components/Home";
>>>>>>> e7586cd2dbba6a89b58deb78b57b0c9031586d1b

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
<<<<<<< HEAD
          <ChatProvider>
            <ProfileButton />
            <Nav />
            <CreateButtons />
            <FriendsList />
            <Route path="/" exact component={Map} />
          </ChatProvider>
=======
          <ChatroomProvider>
            <ChatProvider>
              <Nav />
              <Route path="/" exact component={Home} />
            </ChatProvider>
          </ChatroomProvider>
>>>>>>> e7586cd2dbba6a89b58deb78b57b0c9031586d1b
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
