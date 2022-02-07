import React from "react";

import "./App.scss";
import Calculator from "./components/Calculator";
import Header from "./components/Header";
import { CalculatorProvider } from "./utils/context/CalculatorProvider";
function App() {
  return (
    <CalculatorProvider>
      <div className="App">
        <Header>Budget Calculator</Header>
        <Calculator />
      </div>
    </CalculatorProvider>
  );
}
export default App;
