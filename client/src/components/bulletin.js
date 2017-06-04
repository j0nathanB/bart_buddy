import React from 'react';
import stationList from './station_coordinates'
import destinations from './destinations'

class Bulletin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render () {
    return (
      <div>
        {this.props.schedule.filter(
          destination => destination.destination === this.props.route
          ).map(arrival => <h1>Next {this.props.route} train in {arrival.minutes} minutes</h1> )}
      </div>
    );
  }
}

export default Bulletin;