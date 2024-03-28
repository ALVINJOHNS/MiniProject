import React,{useState} from 'react';
import { Grommet, Grid, Header,  } from 'grommet';
import './GridView.css';
import VideoTab from '../VideoTab/VideoTab';
import ControlButtons from '../ControlButtons/ControlButtons';


const GridView = () => {



  const [n, setN] = useState(1);

  let columns;
  let rows;
  if(n ===1){

  }else if (n === 2) {
    columns = ['flex', 'flex'];
    rows = ['530px'];
  } else if (n === 3) {
    // When n is 3, explicitly set columns to 2
    columns = ['flex', 'flex'];
    rows = ['50%', '100%'];
  }
  else {
    // Otherwise, calculate columns dynamically
    columns = Array.from({ length: Math.ceil(n / 2) }, () => 'flex');
  }


  return (
    <div  className="Grid-Div">

    <Grommet>
      <Header className='header'>
        Mini Project Meeting
      </Header>
      <Grid 
      
      className='Grid' columns={columns} rows={rows} gap="small">
        {Array.from({ length: n }, (_, index) => (

        <VideoTab  index={index} number={n}></VideoTab>

        ))}
      </Grid>
      <button className='na' onClick={()=>{setN(n+1)}} >add</button>
      <button className='na'  >join</button>
    </Grommet>
    <ControlButtons></ControlButtons>
    </div>
  );
};

export default GridView;

