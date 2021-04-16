import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./components/Nav";
import Map from "./components/Map";
import FriendsList from "./components/FriendsList";

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
    <>
      <div className="App">
        <Map />
        <Nav />
        <FriendsList friend={friend} />
      </div>
    </>
  );
}

export default App;
