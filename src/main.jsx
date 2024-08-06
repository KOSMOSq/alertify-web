import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import withDataLoading from "./hoc/withDataLoading.jsx";
import "./index.css";
import store from "./store/store";

const AppWithDataLoading = withDataLoading(App);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithDataLoading />
    </Provider>
  </React.StrictMode>
);
