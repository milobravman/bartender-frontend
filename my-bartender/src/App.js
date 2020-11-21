
import './App.css';
import React, {useEffect, useState} from 'react'
import TablesMap from './components/TablesMap.js'
import About from './components/About.js'
import Header from './components/Header.js'
import Drinks from './components/Drinks.js'
import Foods from './components/Foods.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {


  const [groups, setGroups] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:3000/groups",{
      method: "get",
      mode: 'cors',
      headers: {'Content-Type': 'application/json'}
    }).then(data => data.json())
    .then(data => setGroups(data))
  }, [])

  console.log(groups[0])



  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header/>
            <TablesMap/>
          </Route>
          <Route exact path="/About">
            <Header/>
            <About/>
          </Route>
          <Route exact path="/Foods">
            <Header/>
            <Foods/>
          </Route>
          <Route exact path="/Drinks">
            <Header/>
            <Drinks/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
