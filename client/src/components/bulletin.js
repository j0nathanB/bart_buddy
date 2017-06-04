import React from 'react';
import stationLat_and_Long from './station_coordinates'

class Bulletin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentStation: {}
    };
  }


  render () {
    return (
      <div>
        <h1>Bulletin: Next Train Arriving in 5 minutes</h1>
      </div>
    );
  }
}

export default Bulletin;