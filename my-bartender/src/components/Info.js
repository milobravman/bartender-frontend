import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import WithFood from './WithFood'
import WithoutFood from './WithoutFood'
import Button from '@material-ui/core/Button';

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
        fetch(`http://localhost:3000/groups/`, {
            method: "post",
            mode: 'cors',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify(group)
        }).then(response => response.json())
        .then(res => console.log(res))
    }

    const deleteGroup = (id) => {
        fetch('http://localhost:3000/groups/' + id, {
        method: 'DELETE',
        })
        .then(res => res.text()) // or res.json()
        .then(res => console.log(res))
    }



    return (
        <div>
            {table.group? 
                <>
                    <h4>
                        Table {table.id} has a group with {table.group.num_people} at it
                    </h4>
                    <Button 
                        variant="contained"
                        style = {{marginBottom: "5px"}}
                        onClick = {() => deleteGroup(table.group.id)}
                        >
                            Group done?
                        
                    </Button>
                </>
            :
                <h3>Table {table.id}</h3>}
            {table.group?
                <WithFood 
                    groupId ={table.group.id} 
                    deleteGroup={deleteGroup}
                />
            :

                <WithoutFood
                    showTable = {props.showTable}
                    handleSubmit = {handleSubmit}
                    handleChange = {handleChange}
                />

            }
        </div>
    );
}

export default Info;