import './App.css';

//Importing compentest that will be used in the app.js file 
import TablesMap from './components/TablesMap.js'
import About from './components/About.js'
import Header from './components/Header.js'
import Drinks from './components/Drinks.js'
import Foods from './components/Foods.js'
import Info from './components/Info.js'


// importing routing dependencies so app has front end routing
import {
  Switch,
  Route,
} from "react-router-dom";
import { withRouter } from "react-router" //use history for login

function App(props) {

  // showTable pushes the spesiic table path to the URI (links to the table the user clicks)
  // passed the tablesmap components
  const showTable = (table_id) => {
    props.history.push(`/Info/${table_id}`)
  }

  // pushes the table index path to the URI
  // 
  const showTables = () => {
    props.history.push(`/`)
  }




  return (
    <>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header/>
            <TablesMap 
              showTable = {showTable}
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
