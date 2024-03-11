import React from 'react';
import { Grommet, Grid, } from 'grommet';
import './GridView.css';
import VideoTab from '../VideoTab/VideoTab';

const GridView = ({ n }) => {
  const columns = Array.from({ length: Math.ceil(n / 2) ,}, () => 'flex');



  return (
    <Grommet>
      <Grid columns={columns} gap="small">
        {Array.from({ length: n }, (_, index) => (
         
        <VideoTab index={index}></VideoTab>
     
        ))}
      </Grid>
    </Grommet>
  );
};

export default GridView;
