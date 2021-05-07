import "./App.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import TermsOfService from "./components/TermsOfService";
import Privacy from "./components/Privacy";
import { Suspense } from "react";
import { useAtom } from "jotai";
import { loading } from "./atoms/AtomHelpers";

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
            {isLoading > 0 ? <img className="loading" src="loading.gif" alt="loading..." /> : null}
            <Route path="/" exact component={Home} />
            <Route path="/tos" exact component={TermsOfService} />
            <Route path="/privacy" exact component={Privacy} />
          </Router>
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
