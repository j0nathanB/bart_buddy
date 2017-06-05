import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view';
import Bulletin from './components/bulletin';
import Station from './components/station';
import TrainRoutes from './components/trainRoutes';
import LocationButton from './components/currentLocation';
import Map from './components/map.js';
import ClosestStation from './components/closestStation';
import stationLat_and_Long from './components/station_coordinates';
import destinations from './components/destinations';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios'


injectTapEventPlugin();


const getCoords = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({ lat: position.coords.latitude, long: position.coords.longitude });
  });
});


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      lat: 37.78,
      long: -122.409,
      userLat: 0,
      userLong: 0,
      isLoading: false,
      currentStation: stationLat_and_Long[0],
      currentRoute: destinations[0],
      schedule: []
    };
    this.updateRoute = this.updateRoute.bind(this);
    this.updateStation = this.updateStation.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this)
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    });

    getCoords()
    .then( (response) => {
      this.setState({
        lat: response.lat,
        long: response.long,
        userLat: response.lat,
        userLong: response.long,
        isLoading: false
      });
    });
  }

  updateRoute(data) {
    this.setState({currentRoute: data});
  }

  updateStation(data) {
    console.log(data);
    this.setState({
      currentStation: data,
      lat: data.gtfs_latitude,
      long: data.gtfs_longitude,
    });
  }

  useCurrentLocation() {
    this.setState({
      lat: this.state.userLat,
      long: this.state.userLong
    })
  }

  getSchedule(station) {
    let tempSchedule = [];

    axios.post('/api/schedule', station)
    .then( 
      res => res.data.station.etd.map( 
        route => route.estimate.map( 
          eta => { tempSchedule.push( {minutes: eta.minutes, destination:route.destination} ) } 
        ) 
      )
    )
    .then( () => {
      this.setState({
        schedule: tempSchedule
      })
    })
    .catch(err => {
      throw err;
    });
  }

  componentDidMount() {
    setInterval(() => this.getSchedule(this.state.currentStation), 15000)
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <View />
          <ClosestStation lat={this.state.userLat} long={this.state.userLong} />
          <LocationButton clickHandler={this.useCurrentLocation}/>
          <Station updateStation={this.updateStation} getSchedule={this.getSchedule}/>
          <TrainRoutes clickHandler={this.updateRoute}/>
          <Map center={[this.state.long, this.state.lat]} loading={this.state.isLoading}/>
          <Bulletin station={this.state.currentStation} route={this.state.currentRoute} schedule={this.state.schedule} getSchedule={this.getSchedule}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

