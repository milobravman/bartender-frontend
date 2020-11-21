
import './App.css';
import React, {useEffect, useState} from 'react'
import TablesMap from './components/TablesMap.js'
import About from './components/About.js'
import Header from './components/Header.js'
import Drinks from './components/Drinks.js'
import Foods from './components/Foods.js'
import {
  Switch,
  Route,
} from "react-router-dom";
import { withRouter } from "react-router" //use history for login

function App(props) {


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

  const showTable = () => {
    props.history.push(`/about`)
  }



  return (
    <>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header/>
            <TablesMap showTable = {showTable}/>
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
    </>
  );
}

export default withRouter(App);
