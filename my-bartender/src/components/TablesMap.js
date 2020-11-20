import React, {useEffect, useState} from 'react';

function TablesMap(props) {

    const [tables, setTables] = useState([]);

    useEffect(()=> {
      fetch("http://localhost:3000/tables",{
        method: "get",
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
      }).then(data => data.json())
      .then(data => setTables(data))
    }, [])

    console.log(tables)
    return (
        <div>
            
        </div>
    );
}

export default TablesMap;