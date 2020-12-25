import React, {useEffect, useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { Button } from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

// This component is responsible for adding Drinks to a groups ordered list
export default function DrinkForm(props) {
  const classes = useStyles();
  const [drinkId, setDrinkId] = useState('');

  const handleChange = (event) => {
    setDrinkId(event.target.value);
    
  };

  const [drinks, setDrinks] = useState([]);

  useEffect(()=> {
    fetch("http://localhost:3000/drinks",{
      method: "get",
      mode: 'cors',
      headers: {'Content-Type': 'application/json'}
    }).then(data => data.json())
    .then(data => setDrinks(data))
  }, [])

  const addDrink = (id) => {
      let order = {
          group_id: props.groupId,
          drink_id: parseInt(id)
      }
      fetch(`http://localhost:3000/drink_groups/`, {
        method: "post",
        mode: 'cors',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify(order)
      }).then(r => 
        props.updateGroup())
  }
  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native">Age</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="" />  
          {drinks.map(drink => (
              <option key = {drink.id} value = {drink.id}>{drink.name}</option>
          ))}
        </NativeSelect>
        <Button

            style = {{
                backgroundColor: "#03cffc",
                marginTop: "1%"
            }}
            onClick = {() =>addDrink(drinkId)}
        >
            Add to order
        </Button>
      </FormControl>
    </div>
  );
}