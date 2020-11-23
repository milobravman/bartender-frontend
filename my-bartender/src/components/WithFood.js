import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



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
      },[])

      console.log(group.foods)



      


    return (
     <div className = {classes.paperDiv}>
        <Grid container spacing={3}>
            <Grid item xs={6} className = {classes.paperDiv}>
                <Paper className={classes.paper}>
                    <h5>Food</h5>
                    <ul style = {{listStyleType: "none"}}>
                        {group.foods? group.foods.map((food,index) => (
                            <li key = {index}>{food.name}</li>
                        )) :null}
                      
                    </ul>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>
                    <h5>Drinks</h5>
                    <ul style = {{listStyleType: "none"}}>
                        {group.drinks? group.drinks.map((drinks,index) => (
                            <li key = {index}>{drinks.name}</li>
                        )) :null}
                    </ul>
                </Paper>
            </Grid>
        </Grid>
        
    </div>
        
    );
}



export default WithFood;