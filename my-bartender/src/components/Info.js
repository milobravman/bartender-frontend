import React, {useEffect, useState} from 'react';

function Info(props) {

    // const [table, setTable] = useState([]);

    // useEffect(()=> {
    //     fetch("http://localhost:3000/foods",{
    //       method: "get",
    //       mode: 'cors',
    //       headers: {'Content-Type': 'application/json'}
    //     }).then(data => data.json())
    //     .then(data => setFoods(data))
    //   }, [])

      


    return (
        <div>
            <h3>Table {props.tableId}</h3>

            <p>If table is empty add group functionality goes here</p>
            <p>Else let the group order food from here</p>

        </div>
    );
}

export default Info;