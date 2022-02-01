import "./App.css";
import React from "react";
import { Provider } from "react-redux";
// import PublicLayout from "./layouts/public";
import Routers from "./routes";
import store from "./store";
import "./assets/scss/main.scss";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Routers />
      </Provider>
    </div>
  );
}

export default App;
