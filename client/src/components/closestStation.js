import React from 'react';
import stationList from './station_coordinates';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

class ClosestStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentStation: {}
    };
    this.getDistance = this.getDistance.bind(this);
    this.getClosestStation = this.getClosestStation.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }


  getDistance (userCoords, stationObj) {
    var R = 6371e3; // metres
    var lat1 = userCoords.lat * (Math.PI / 180);
    var lat2 = stationObj.lat * (Math.PI / 180);
    var deltaLat = (stationObj.lat - userCoords.lat) * (Math.PI / 180);
    var deltaLong = (stationObj.long - userCoords.long) * (Math.PI / 180);

    var a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLong / 2) * Math.sin(deltaLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };


  getClosestStation (userCoords) { 
    let stations = stationList.map( station => { 
      let stationDistance = this.getDistance(userCoords, {lat: station.gtfs_latitude, long: station.gtfs_longitude});
      let timeToStation = Math.ceil(stationDistance / 1.4 / 60);
        return { 
          name: station.name, 
          lat: station.gtfs_latitude, 
          long: station.gtfs_longitude,
          abbr: station.abbr,
          distance: stationDistance,
          userTime: timeToStation
        }
      }
    );

    let shortestDistance = Math.min.apply(Math, stations.map( station => station.distance ));
    let closestStation = stations.find( station => station.distance === shortestDistance );

    return closestStation;
  }

  handleClick(){
    let station = this.getClosestStation({lat: this.props.lat, long:this.props.long})
    this.props.clickHandler(station);
  }


  render() {
    return (
      <div style={{gridColumn: '1/3', gridRow:1, margin:'auto'}}>
        <RaisedButton label="Use Closest" primary={true} style={style} onTouchTap={this.handleClick}/>
      </div>
    );
  }
}

export default ClosestStation;