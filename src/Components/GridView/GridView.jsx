import React, { useState } from 'react';
import { Grommet, Grid, Header } from 'grommet';
import './GridView.css';
import VideoTab from '../VideoTab/VideoTab';
import ControlButtons from '../ControlButtons/ControlButtons';

const GridView = (props) => {
  const [n, setN] = useState(1);
  const [videoStream, setVideoStream] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  
  const addParticipant = () => {
    setN(n + 1);
    // Code to set up peer connection with new participant
    // ...
  };

  // Function to handle incoming remote streams
  const handleRemoteStream = (stream) => {
    setRemoteStreams(prevStreams => [...prevStreams, stream]);
  };

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
              index={index}
              number={n}
              stream = {index === 0 ? props.videoStream : remoteStreams[index-1]}
            />
          ))}
        </Grid>
        <button className='na' onClick={addParticipant}>Add Participant</button>
        <button className='na'>Join</button>
      </Grommet>
      <ControlButtons />
    </div>
  );
};

export default GridView;