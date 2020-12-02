import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FoodForm from './FoodForm.js'
import DrinkForm from './DrinkForm.js'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: "#D3D3D3",
    },
    status: {
      border: "solid #000",
      borderWidth: "1px",
      listStyleType: "none",
      padding: "0",
    }
  
  }));

function WithFood(props) {

  const tablePosition = props.tablePosition-1
  


    //const [Delivered, setDelivered] = useState(null)
    const [group, setGroup] = useState([])
    const classes = useStyles();
    const [foodOrdered, setFoodOrdered] = useState(null)
    const [foodDelivered, setFoodDelivered] = useState(null)
    const [drinkOrdered, setDrinkOrdered] = useState(null)
    const [drinkDelivered, setDrinkDelivered] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3000/groups/${props.groupId}`,{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => {
          setGroup(data)
          setFoodOrdered(data.foods)
          setDrinkOrdered(data.drinks)
          //debugger
          props.setGroupsData([...props.groupsData].map(obj => {
            //debugger
            if (obj.id === props.tableId){
              return {
                ...obj,
                foodOrdered: data.foods,
                drinkOrdered: data.drinks
              }
            }else{
              return obj
            }
          }))
          if (props.foodOrdered != null){
            setFoodOrdered(props.foodOrdered)
          }

        })
      },[props.groupId, props.tablePosition])



      const updateGroup = () => {
        fetch(`http://localhost:3000/groups/${props.groupId}`,{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => {
          setGroup(data)
          setFoodOrdered(data.foods)
          setDrinkOrdered(data.drinks)
          props.setGroupsData([...props.groupsData.map(group => {
            if (group.id === props.tableId){
              return {
                ...group,
                foodOrdered: data.foods,
                drinkOrdered: data.drinks
              }
            }else{
              return group
            }
          })])
        })
      }

      const showFoods = () => {
        setFMenu(!foodMenu)
      }
      const showDrinks = () => {
        setDMenu(!drinkMenu)
      }

      const [foodMenu, setFMenu] = useState(false)
      const [drinkMenu, setDMenu] = useState(false)

      
      const calcFood$ = () => {
        let FoodPrice = 0
        group.foods.map(food => FoodPrice+=food.price)
        props.setFoodsPrice(FoodPrice)
        return (<p>{FoodPrice}$</p>)
      }
      const calcDrink$ = () => {
        let DrinkPrice = 0
        group.drinks.map(drink => DrinkPrice+=drink.price)
        props.setDrinksPrice(DrinkPrice)
        return (<p>{DrinkPrice}$</p>)
      }

      const addToDeliverd = (target) => {
        props.setGroupsData([...props.groupsData.map(obj => {
          if (obj.id === props.tableId){
            if (obj.foodDelivered === null) {
              return {
                ...obj,
                foodDelivered: [target]
              }
            }else{
              return{
                ...obj,
                foodDelivered: [...obj.foodDelivered, target]
              }
            }
          }else{
            return obj
          }
        })])
        removeFromOrderedFood(target)
        //setDelivered(true)

      }

      const addToDrinkDeliverd = (target) => {
        props.setGroupsData([...props.groupsData.map(obj => {
          if (obj.id === props.tableId){
            if (obj.drinkDelivered === null) {
              return {
                ...obj,
                drinkDelivered: [target]
              }
            }else{
              return{
                ...obj,
                drinkDelivered: [...obj.drinkDelivered, target]
              }
            }
          }else{
            return obj
          }
        })])
        //removeFromOrderedDrink(target)
        //setDelivered(true)
      }

      const removeFromOrderedFood = (target) => {
        let updated = props.groupsData[tablePosition].foodOrdered.filter(food => {
          if (food.id !== target.id) {
            return food
          }
        })
        
        props.setGroupsData([...props.groupsData.map(obj => {
          if (obj.id === props.tableId){
              return{
                ...obj,
                foodOrdered: [updated]
              }
          }else{
            return obj
          }
        })])
        
      }

      const removeFromOrderedDrink = (target) => {
        let updated = drinkOrdered.filter(drink => {
          if (drink.id !== target.id) {
            return drink
          }
        })
        props.setDrinkOrdered(updated)
        setDrinkOrdered(updated)
      }

    return (
     <div className = {classes.paperDiv}>
        <Grid container spacing={3}>
            <Grid item xs={6} className = {classes.paperDiv}>
                <Paper className={classes.paper}>
                    <h5>Food</h5>

                    <div id = "Group" style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                      <div id = "Ordered" style = {{marginRight: "8%", width: "35%"}}>
                        <h6 style = {{marginBottom: "0px", marginTop: "0px"}}>Ordered</h6>


                        <ul className = {classes.status}>
                            {props.groupsData[tablePosition].foodOrdered? props.groupsData[tablePosition].foodOrdered.map((food,index) => (
                                <li onClick = {() => addToDeliverd(food)} key = {index}>{food.name}, price: {food.price}</li>
                            )) :null}
                        </ul>
                      </div>
                      <div id = "Delivered" style = {{marginLeft: "8%", width: "35%"}}>
                        <h6 style = {{marginBottom: "0px", marginTop: "0px"}}>Delivered</h6>
                        <ul className = {classes.status}>
                          {props.groupsData[tablePosition].foodDelivered? props.groupsData[tablePosition].foodDelivered.map((food,index) => (
                                <li key = {index}>{food.name}, price: {food.price}</li>
                            )) :null}
                        </ul>
                      </div>
                    </div>
                    <p>
                      {group.foods? calcFood$(): null}
                    </p>
                    <Button 
                        style = {{
                          backgroundColor: "#03cffc",
                          marginLeft: "80%"
                        }}
                        onClick = {() => {showFoods()}}
                    >
                          Add Food
                    </Button>
                    {foodMenu === true?
                      <FoodForm 
                        groupId = {props.groupId} 
                        updateGroup = {updateGroup}
                      />
                    :null}
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <h5>Drinks</h5>
                    <div id = "Group" style = {{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                      <div id = "Ordered" style = {{marginRight: "8%", width: "35%"}}>
                        <h6 style = {{marginBottom: "0px", marginTop: "0px"}}>Ordered</h6>
                        <ul className = {classes.status}>
                            {drinkOrdered? drinkOrdered.map((drink,index) => (
                                <li onClick = {() => addToDrinkDeliverd(drink)} key = {index}>{drink.name}, price: {drink.price}</li>
                            )) :null}
                        </ul>
                      </div>
                      <div id = "Delivered" style = {{marginLeft: "8%", width: "35%"}}>
                        <h6 style = {{marginBottom: "0px", marginTop: "0px"}}>Delivered</h6>
                        <ul className = {classes.status}>
                          {props.groupsData[tablePosition].drinkDelivered? props.groupsData[tablePosition].drinkDelivered.map((drink,index) => (
                                <li key = {index}>{drink.name}, price: {drink.price}</li>
                            )) :null}
                        </ul>
                      </div>
                    </div>
                    <p>
                      {group.drinks? calcDrink$(): null}
                    </p>
                    <Button 
                        style = {{
                          backgroundColor: "#03cffc",
                          marginLeft: "80%"
                        }}
                        onClick = {() => {showDrinks()}}
                    >
                          Add Drink
                    </Button>
                    {drinkMenu === true?
                      <DrinkForm 
                        groupId = {props.groupId}
                        updateGroup = {updateGroup}
                      />
                    :null}
                </Paper>
            </Grid>
        </Grid>
        
    </div>
        
    );
}



export default WithFood;