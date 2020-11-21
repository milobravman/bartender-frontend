import React, {useEffect, useState} from 'react';

function Drinks(props) {

    const [drinks, setDrinks] = useState([]);

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