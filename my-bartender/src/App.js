
import './App.css';
import React, {useEffect} from 'react'

function App() {

  useEffect(()=> {
    fetch("http://localhost:3000/groups",{
      method: "get",
      mode: 'cors',
      headers: {'Content-Type': 'application/json'}
    }).then(data => data.json())
    .then(data => console.log(data))
  })



  return (
    <div className="App">

    </div>
  );
}

export default App;
