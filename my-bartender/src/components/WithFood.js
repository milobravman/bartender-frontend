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
    button: {
      
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
        .then(data => setGroup(data))
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


      // function resolveAfter2Seconds() {
      //   return new Promise(resolve => {
      //       resolve('resolved');
        
      //   });
      // }
      
      // async function asyncCall() {
      //   console.log('calling');
      //   const result = await resolveAfter2Seconds();
      //   console.log(result);
      //   // expected output: "resolved"
      // }
      
      // asyncCall();



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
        return (<p>{FoodPrice}$</p>)
      }
      const calcDrink$ = () => {
        let DrinkPrice = 0
        group.drinks.map(drink => DrinkPrice+=drink.price)
        return (<p>{DrinkPrice}$</p>)
      }

    return (
     <div className = {classes.paperDiv}>
        <Grid container spacing={3}>
            <Grid item xs={6} className = {classes.paperDiv}>
                <Paper className={classes.paper}>
                    <h5>Food</h5>
                    <ul style = {{listStyleType: "none"}}>
                        {group.foods? group.foods.map((food,index) => (
                            <li key = {index}>{food.name}, price: {food.price}</li>
                        )) :null}

                    </ul>
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
                    <ul style = {{
                        listStyleType: "none",
                        textAlign: "center"
                      }}>
                        {group.drinks? group.drinks.map((drink,index) => (
                            <li key = {index}>{drink.name}, price:{drink.price}</li>
                        )) :null}
                    </ul>
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