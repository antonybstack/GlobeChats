import "./App.css";
import Nav from "./components/Nav";
import AuthProvider from "./contexts/AuthContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import { Suspense } from "react";
import { useAtom } from "jotai";
import { loading } from "./atoms/AuthAtom";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [isLoading] = useAtom(loading);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<img className="loading" src="loading.gif" alt="loading..." />}>
          <Router>
            <AuthProvider>
              {isLoading > 0 ? <img className="loading" src="loading.gif" alt="loading..." /> : null}
              <Nav />
              <Route path="/" exact component={Home} />
            </AuthProvider>
          </Router>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
