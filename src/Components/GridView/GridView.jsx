import React,{useState} from 'react';
import { Grommet, Grid, Header,  } from 'grommet';
import './GridView.css';
import VideoTab from '../VideoTab/VideoTab';


const GridView = () => {
  
  const [n, setN] = useState(1);

  const columns = Array.from({ length: Math.ceil(n / 2) ,}, () => 'flex');

  return (
    <div  className="Grid-Div">

    <Grommet>
      <Header className='header'>
        Mini Project Meeting
      </Header>
      <Grid className='Grid' columns={columns} gap="small">
        {Array.from({ length: n }, (_, index) => (

        <VideoTab  index={index} number={n}></VideoTab>

        ))}
      </Grid>
      <button className='na' onClick={()=>{setN(n+1)}} >add</button>
    </Grommet>
    ControlButtons
    </div>
  );
};

export default GridView;

