import React from "react";

import "./App.scss";
import Calculator from "./components/Calculator";
import Header from "./components/Header";
import CalculatorProvider from "./utils/context/CalculatorProvider";
function App() {
  return (
    <div className="App">
      <CalculatorProvider>
        <Header>Budget Calculator</Header>
        <Calculator />
      </CalculatorProvider>
    </div>
  );
}
export default App;
