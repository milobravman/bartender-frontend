import { Link } from 'react-router-dom' 
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HomeIcon from '@material-ui/icons/Home';
import LocalBarIcon from '@material-ui/icons/LocalBar';



const useStyles = makeStyles({
  //material UI style 
  root: {
    flexGrow: 10,
  },

  });
  
  const Headers = () =>{
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      
     
      <Tabs 
      value = {false}
      centered>
      <h3 id = "header-logo">My-Bartender</h3>
      <Link to='/' >
        <Tab v icon={<HomeIcon/>}/>
      </Link>
   

       <Link to="/drinks"><Tab  icon={<LocalBarIcon/>}/></Link>
       <Link to="/foods"><Tab  icon={<FastfoodIcon />}/></Link>


       
      </Tabs>
    </Paper>
  );
}

export default Headers