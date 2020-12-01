
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
import Info from './components/Info.js'

function App(props) {

  const showTable = (table_id) => {
    props.history.push(`/Info/${table_id}`)
  }
  const showTables = () => {
    props.history.push(`/`)
  }


  const [foodOrdered, setFoodOrdered] = useState([
    {1: null},
    {2: null},
    {3: null},
    {4: null},
    {5: null},
    {6: null}
  ])
  const [foodDelivered, setFoodDelivered] = useState(null)
  const [drinkOrdered, setDrinkOrdered] = useState(null)
  const [drinkDelivered, setDrinkDelivered] = useState(null)


  return (
    <>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header/>
            <TablesMap 
              showTable = {showTable}
              foodDelivered = {foodDelivered}
              foodOrdered = {foodOrdered}
              drinkDelivered = {drinkDelivered}
              drinkOrdered = {drinkOrdered}
            />
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
          <Route exact path= "/Info/:id"
          render = {props => {
            let tableId = props.match.params.id
            return (
              <>
              <Header/>
              <Info
                tableId = {tableId} 
                showTable = {showTable}
                showTables = {showTables}
                foodDelivered = {foodDelivered}
                foodOrdered = {foodOrdered}
                drinkDelivered = {drinkDelivered}
                drinkOrdered = {drinkOrdered}
                setFoodDelivered = {setFoodDelivered}
                setFoodOrdered = {setFoodOrdered}
                setDrinkDelivered = {setDrinkDelivered}
                setDrinkOrdered = {setDrinkOrdered}
                />
              </>
            )
          }} 
          />
    
        </Switch>
      </div>
    </>
  );
}

export default withRouter(App);
