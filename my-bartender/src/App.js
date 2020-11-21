
import './App.css';
import React, {useEffect, useState} from 'react'
import TablesMap from './components/TablesMap.js'
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
    <div className="App">

      <TablesMap/>







    </div>
  );
}

export default App;
