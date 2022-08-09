import { h } from "preact";
import { Route, Router } from "preact-router";
import Pokedex from "../routes/pokedex";

const App = () => (
  <div id="app">
    <Router>
      <Route path="/" component={Pokedex} />
    </Router>
  </div>
);

export default App;
