import { Link } from 'react-router-dom' 
//import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HomeIcon from '@material-ui/icons/Home';
import LocalBarIcon from '@material-ui/icons/LocalBar';


//simple header component no matrial styles used 
  
  const Headers = () =>{
  return (
    <Paper>
     
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