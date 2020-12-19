import React, {useEffect, useState} from 'react';


// Very simple index page for the drinks that are set on the backend
// A good addtion would be to make create update and destroy methods for this page however that may be unnessary until 
// the app can handle muntiple restaurants
function Drinks(props) {

    const [drinks, setDrinks] = useState([]);

    // fetching the drink data from the backend with.
    // the [] dependency array prevents the use effect from constantly fetching
    useEffect(()=> {
        fetch("http://localhost:3000/drinks",{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => setDrinks(data))
      }, [])


    return (
        <div>
            <h3>Drinks</h3>
            {drinks.map(drink => {
                return <p key = {drink.id}>{drink.name}</p>
            })}
        </div>
    );
}

export default Drinks;