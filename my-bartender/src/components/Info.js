import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';

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



function Info(props) {

    const classes = useStyles();

    const [table, setTable] = useState([]);
    const [groupSize, setSize] = useState([])
    const [group, setGroup] = useState([])

    useEffect(()=> {
        fetch(`http://localhost:3000/tables/${props.tableId}`,{
          method: "get",
          mode: 'cors',
          headers: {'Content-Type': 'application/json'}
        }).then(data => data.json())
        .then(data => setTable(data))
      },[props.tableId])

    const handleChange = (event) =>{
        setSize({size: event.target.value})
    }
    const handleSubmit = () =>{
        let group = {
            num_people: groupSize.size,
            table_id: props.tableId
        }
        console.log(group)
        fetch(`http://localhost:3000/groups/`, {
            method: "post",
            mode: 'cors',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(group)
        }).then(response => response.json())
        .then(res => console.log(res))
    }

    const fetchGroup = () => {
        fetch(`http://localhost:3000/groups`,{
            method: "get",
            mode: 'cors',
            headers: {'Content-Type': 'application/json'}
          }).then(data => data.json())
          .then(data => setGroup(data))

          console.log(group)
        }

    return (
        <div>
            {table.group? 
            <h4>Table {table.id} has a group with {table.group.num_people} at it</h4>:
            <h3>Table {table.id}</h3>}
            {table.group?
            
            <div className = {classes.paperDiv}>
                {() => fetchGroup()}
                <Grid container spacing={3}>
                <Grid item xs={6} className = {classes.paperDiv}>
                    <Paper className={classes.paper}>
                        <h5>Food</h5>
                        <ul>
                        </ul>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <h5>Drinks</h5>
                        <ul>
                        </ul>
                    </Paper>
                </Grid>
                </Grid>
            </div>:
            <>
                <p>This table is Empty</p>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField 
                    id="groupSize" 
                    label="number of people" 
                    onChange = {(event) => handleChange(event)}/>
                </form>
                <Button type ="submit" variant="contained" onClick= {() => handleSubmit()}>
                    Add a new Group
                </Button>
            </>
            }
        </div>
    );
}

export default Info;