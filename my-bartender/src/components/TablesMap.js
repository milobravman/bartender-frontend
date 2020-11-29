import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
// import { Link } from 'react-router-dom' 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function TablesMap(props) {

    const classes = useStyles();

    const [tables, setTables] = useState([]);


    useEffect(()=> {
      fetch("http://localhost:3000/tables",{
        method: "get",
        mode: 'cors',
        headers: {'Content-Type': 'application/json'}
      }).then(data => data.json())
      .then(data => setTables(data))
    }, [])

    return (
        // <ul>
        //     {tables.map(table => {
        //         return <li key = {table.id}>{table.position}</li>
        //     })}
        // </ul>
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
            <ListSubheader component="div">
              Table Overview
            </ListSubheader>
          </GridListTile>

            {tables.map((table) => (
              <GridListTile 
                key={table.id} 
                onClick = {() => props.showTable(table.id)}
                style = {{border: "solid #000",
                  borderWidth: "1px"}}
              >
                  {table.group?
                    <h3>
                      {`Table occupied with ${table.group.num_people} people`}
                    </h3>:
                    <h3>
                      Empty
                    </h3>
                  }
                    <GridListTileBar
                      
                title={
                <Button style = {{ backgroundColor: "#add8e6"}}>{`Table: ${table.position}`}</Button>}
                      actionIcon={
                      <IconButton 
                        aria-label={`info about ${table.position}`} 
                        className={classes.icon}>
                        <InfoIcon />
                      </IconButton>}/>
            </GridListTile>))}
        </GridList>
      </div>
    );
}

export default TablesMap;