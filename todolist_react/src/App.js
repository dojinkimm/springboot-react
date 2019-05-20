import React from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar';
import "./App.css";
import TodoDashboard from './components/TodoDashboard';
import AddToDo from "./components/ToDos/AddToDo"; 
import UpdateToDo from "./components/ToDos/UpdateToDo"
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Provider} from "react-redux"
import store from "./store"


function App() {
  return (
    <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={TodoDashboard} />
        <Route exact path="/addToDo" component={AddToDo} />
        <Route exact path="/updateToDo/:id" component={UpdateToDo}/>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
