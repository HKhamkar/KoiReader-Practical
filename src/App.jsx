import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Products from "./pages/Products";
import { Provider } from "react-redux";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
