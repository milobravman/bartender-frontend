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

    const [group, setGroup] = useState([])
    const classes = useStyles();

    useEffect(()=> {
        fetch(`http://localhost:3000/groups/${props.groupId}`,{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => {
          setGroup(data)
        })
      },[props.groupId])

      const updateGroup = () => {
        fetch(`http://localhost:3000/groups/${props.groupId}`,{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => {
          setGroup(data)
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
        if (props.foodDelivered === null) {
          props.setFoodDelivered([target])
        }
        else {
          props.setFoodDelivered([...props.foodDelivered,target])
        }
        removeFromOrdered(target)

      }

      const addToDrinkDeliverd = (target) => {
        if (props.drinkDelivered === null) {
          props.setDrinkDelivered([target])
        }
        else {
          props.setDrinkDelivered([...props.drinkDelivered,target])
        }
        removeFromOrderedDrinks(target)
      }

      const removeFromOrdered = (target) => {
        let updated = props.foodOrdered.filter(food => {
          if (food.id !== target.id) {
            return food
          }
        })
        props.setFoodOrdered(updated)
      }

      const removeFromOrderedDrinks = (target) => {
        let updated = props.drinkOrdered.filter(drink => {
          if (drink.id !== target.id) {
            return drink
          }
        })
        props.setDrinkOrdered(updated)
      }

      const orderedListFood = (food_group) => {
        if (food_group.status === "ordered"){
          return <li 
            onClick = {() => addToDeliverd(food_group)} 
            key = {food_group.id}>
              {food_group.food.name}, price: {food_group.food.price}
            </li>
        }
      }

      const orderedListDrink = (drink_group) => {
        if (drink_group.status === null){

        return <li 
        onClick = {() => addToDeliverd(drink_group)} 
        key = {drink_group.id}>
          {drink_group.drink.name}, price: {drink_group.drink.price}
        </li>
        }
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
                            {group.food_groups? group.food_groups.map((food_group) => (
                              orderedListFood(food_group)
                            )) :null}
                        </ul>
                      </div>
                      <div id = "Delivered" style = {{marginLeft: "8%", width: "35%"}}>
                        <h6 style = {{marginBottom: "0px", marginTop: "0px"}}>Delivered</h6>
                        <ul className = {classes.status}>
                          {props.foodDelivered? props.foodDelivered.map((food,index) => (
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
                            {group.drink_groups? group.drink_groups.map(drink_group => (
                                orderedListDrink(drink_group)
                            )) :null}
                        </ul>
                      </div>
                      <div id = "Delivered" style = {{marginLeft: "8%", width: "35%"}}>
                        <h6 style = {{marginBottom: "0px", marginTop: "0px"}}>Delivered</h6>
                        <ul className = {classes.status}>
                          {props.drinkDelivered? props.drinkDelivered.map((drink,index) => (
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