import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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


function WithoutFood(props) {

    const classes = useStyles();

    return (

        <>
            <p>This table is Empty</p>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    id="groupSize" 
                    label="number of people" 
                    onChange = {(event) => props.handleChange(event)}
                />
            </form>
            <Button type ="submit" variant="contained" 
                    onClick= {() => {
                        props.handleSubmit()
                        }}>
                Add a new Group
            </Button>
        </> 
        
    );
}




export default WithoutFood;