import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import MainLoadingScreen from "./components/mainLoadingScreen/MainLoadingScreen";
import MainLayout from "./layout/mainLayout/MainLayout";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import SearchedMovies from "./components/searchedMovies/SearchedMovies";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/browse" />} />
          <Route path="/browse" element={<MainLayout />} />
          <Route path="/search/:query" element={<SearchedMovies />} />
          <Route path="*" element={<MainLoadingScreen />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
