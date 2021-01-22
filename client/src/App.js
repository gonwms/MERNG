import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import MenuBar from "./components/MenuBar";

function App() {
  return (
    <div>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
