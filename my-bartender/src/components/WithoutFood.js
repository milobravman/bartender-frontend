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
    error:  {
      color: "red"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: "#D3D3D3",
    },
  
  }));

// This componet is responsible for adding a new group to a table.
// This component needs front end validations baced on the tables seasting size
function WithoutFood(props) {

    const classes = useStyles();

    /*
    This is deffently a strange way to handle this form
    the handleChange function is what hold the value of the from in state 

    The handleCreateGroups then creates the group by using that number

    I think that there is no reason to save the Group's size in state and simply handling the form when it is submited would be better
    */

    const handleChange = (event) =>
    {
      props.setSize({size: event.target.value})
    }
    const handleCreateGroup = () =>{
  
      if (props.groupSize.size <= props.table.seats){

          let group = {
              num_people: props.groupSize.size,
              table_id: props.table.id
          }
          fetch(`http://localhost:3000/groups/`, {
              method: "post",
              mode: 'cors',
              headers:{'Content-Type': 'application/json'},
              body: JSON.stringify(group)
          }).then(response => props.updateTable())

      }
      else 
      {
          alert(`The group has more people than the table can hold!`)
          document.querySelector("#groupSize").value = ""
          document.querySelector("#sizeLimit").className = classes.error
      }
      
  }




    return (

        <>
            <p>
              This table is Empty. 
              <span id = "sizeLimit">
              {` It can hold ${props.table.seats} `} 
              </span> 
              people
              </p>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField 
                    id="groupSize" 
                    label="number of people" 
                    onChange = {(event) => handleChange(event)}
                />
            </form>
            <Button type ="submit" variant="contained" 
                    onClick= {() => {
                      handleCreateGroup()
                        }}>
                Add a new Group
            </Button>
        </> 
        
    );
}




export default WithoutFood;