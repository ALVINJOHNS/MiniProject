import React, { useState } from 'react';
import { Grommet, Grid, Header } from 'grommet';
import './GridView.css';
import VideoTab from '../VideoTab/VideoTab';
import ControlButtons from '../ControlButtons/ControlButtons';

const GridView = (props) => {
  const [n, setN] = useState(2);
  const [remoteStreams, setRemoteStreams] = useState([]);

  
  const addParticipant = () => {
    setN(n + 1);
    // Code to set up peer connection with new participant
    // ...
  };

  // Function to handle incoming remote streams

  let columns;
  let rows;
  if (n === 1) {
    // Define grid layout for single participant
  } else if (n === 2) {
    // Define grid layout for two participants
    columns = ['flex', 'flex'];
    rows = ['530px'];
  } else if (n === 3) {
    // Define grid layout for three participants
    columns = ['flex', 'flex'];
   
  } else {
    // Calculate grid layout dynamically for more than three participants
    columns = Array.from({ length: Math.ceil(n / 2) }, () => 'flex');
  }

  return (
    <div className="Grid-Div">
      <Grommet>
        <Header className='header'>
          Mini Project Meeting
        </Header>
        <Grid className='Grid' columns={columns} rows={rows} gap="small">
          {Array.from({ length: n }, (_, index) => (
            <VideoTab
              key={index}
              name={props.name}
              stream={index === 0 ? props.videoStream : props.remoteStream}
              // index={index}
              // number={2}
              // stream = { props.number=== 0 ? props.videoStream :props.remoteStreams[index]}
            />
          ))}
        </Grid>
        {/*   <button className='na' onClick={addParticipant}>Add Participant</button> */}
       
      </Grommet>
     
    </div>
  );
};

export default GridView;