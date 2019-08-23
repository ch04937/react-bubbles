import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import FormikLoginHistory from "./components/Login";
import "./styles.scss";

import BubblePage from './components/BubblePage';
import PrivateRoute from './components/PrivateRoute'

function App() {
  const [colorList, setColorList] = useState([]);
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={FormikLoginHistory} />
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <PrivateRoute exact path='/api/colors' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
