import React from 'react';
import ReactDOM from 'react-dom';
import View from './components/view';
import Bulletin from './components/bulletin';
import Station from './components/station';
import TrainRoutes from './components/trainRoutes';
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
      lat: 0,
      long: 0,
      isLoading: false,
      currentStation: stationLat_and_Long[0],
      currentRoute: destinations[0],
      schedule: []
    };
    this.updateRoute = this.updateRoute.bind(this);
    this.updateStation = this.updateStation.bind(this);
//    this.simplePost = this.simplePost.bind(this);
    this.getSchedule = this.getSchedule.bind(this);
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
        isLoading: false
      });
    });
  }

  // simplePost(route, station) {
  //   axios.post('/api', { 
  //     currentRoute: route, 
  //     currentStation: station
  //   }).then(res => {
  //     console.log('updated simplePost:', res);
  //   })
  //   .catch(err => {
  //     throw err;
  //   });
  // }

  updateRoute(data) {
    this.setState({currentRoute: data});
    //this.simplePost(data, this.state.currentStation);
  }

  updateStation(data) {
    this.setState({currentStation: data});
    //this.simplePost(data, this.state.currentStation);
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

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <View />
          <ClosestStation lat={this.state.lat} long={this.state.long} loading={this.state.isLoading}/>
          <Station updateStation={this.updateStation} getSchedule={this.getSchedule}/>
          <TrainRoutes clickHandler={this.updateRoute}/>
          <Map center={this.state.lat, this.state.long} loading={this.state.isLoading}/>
          <Bulletin route={this.state.currentRoute} schedule={this.state.schedule}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

