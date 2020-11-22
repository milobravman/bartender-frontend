import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));



function Info(props) {

    const classes = useStyles();

    const [table, setTable] = useState([]);
    const [groupSize, setSize] = useState()

    useEffect(()=> {
        fetch(`http://localhost:3000/tables/${props.tableId}`,{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => setTable(data))
      },[props.tableId])

    const handleChange = (event) =>{

    }

    const createGroup = () => {
        fetch(`http://localhost:3000/groups/new`, {
            method: "post",
            mode: 'cors',
            headers:{'Content-Type': 'application/json'}

        }

        )
    }
      
      

    return (
        <div>
            <h3>Table {table.id}</h3>
    {table.group? <p>Table {table.id} has a group with {table.group.num_people} at it</p>:
    <>
    <p>This table is Empty</p>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
      id="groupSize" 
      label="number of people" />
    </form>
    <Button variant="contained" onClick= {() => console.log("hi")}>Add a new Group</Button>
    </>
    }

        </div>
    );
}

export default Info;