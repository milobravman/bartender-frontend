import React, {useEffect, useState} from 'react';
import WithFood from './WithFood'
import WithoutFood from './WithoutFood'
import Button from '@material-ui/core/Button';





function Info(props) {

    const [table, setTable] = useState([]);
    const [groupSize, setSize] = useState([])
    const [foodsPrice, setFoodsPrice] = useState('')
    const [drinksPrice, setDrinksPrice] = useState('')
   

    useEffect(()=> {
        fetch(`http://localhost:3000/tables/${props.tableId}`,{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => setTable(data))
      },[props.tableId])

    const updateTable = () => {
        fetch(`http://localhost:3000/tables/${props.tableId}`,{
            method: "get",
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
          }).then(data => data.json())
          .then(data => {
              setTable(data)
            })
    }

    
    const handleChange = (event) =>{
        setSize({size: event.target.value})
    }
    const handleSubmit = () =>{
        let group = {
            num_people: groupSize.size,
            table_id: props.tableId
        }
        fetch(`http://localhost:3000/groups/`, {
            method: "post",
            mode: 'cors',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(group)
        }).then(response => updateTable())
        
    }

    const deleteGroup = (id) => {
        fetch('http://localhost:3000/groups/' + id, {
        method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => {props.showTables()
            window.location.reload()
        })
    }



    return (
        <div>
            {table.group? 
                <>
                    <h4>
                        Table {table.id} has a group with {table.group.num_people} people at it
                    </h4>
                    <p>Total price: {foodsPrice+drinksPrice}$</p>
                    <Button 
                        variant="contained"
                        style = {{marginBottom: "5px"}}
                        onClick = {() => {
                            deleteGroup(table.group.id)
                        }}
                        >
                            Close Group
                    </Button>
                </>
            :
                <h3>Table {table.id}</h3>}
            {table.group?
                <WithFood 
                    tablePosition = {table.position}
                    setDrinksPrice = {setDrinksPrice}
                    setFoodsPrice = {setFoodsPrice}
                    groupId ={table.group.id} 
                    deleteGroup={deleteGroup}
                    foodDelivered = {props.foodDelivered}
                    foodOrdered = {props.foodOrdered}
                    drinkDelivered = {props.drinkDelivered}
                    drinkOrdered = {props.drinkOrdered}
                    setFoodDelivered = {props.setFoodDelivered}
                    setFoodOrdered = {props.setFoodOrdered}
                    setDrinkDelivered = {props.setDrinkDelivered}
                    setDrinkOrdered = {props.setDrinkOrdered}
                />
            :

                <WithoutFood
                    showTable = {props.showTable}
                    showTables = {props.showTables}
                    updateTable = {updateTable}
                    handleSubmit = {handleSubmit}
                    handleChange = {handleChange}
                />

            }
        </div>
    );
}

export default Info;