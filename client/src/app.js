import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from './components/app_bar'
import View from './components/view';
import Bulletin from './components/bulletin';
import Station from './components/station';
import TrainRoutes from './components/trainRoutes';
import Map from './components/map.js';
import ClosestStation from './components/closestStation';
import stationLat_and_Long from './components/station_coordinates';
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
      currentStation: {},
      currentRoute: '',
      schedule: []
    };
    this.updateRoute = this.updateRoute.bind(this);
    this.updateStation = this.updateStation.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.useCurrentLocation = this.useCurrentLocation.bind(this);
    this.uniqueRoutes = this.uniqueRoutes.bind(this)
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
    this.setState({
      currentStation: data,
      lat: data.gtfs_latitude,
      long: data.gtfs_longitude,
      schedule: []
    });
  }

  useCurrentLocation(data) {
    this.setState({
      currentStation: data, 
      lat: this.state.userLat,
      long: this.state.userLong
    });
    this.updateSchedule(data);
  }

  updateSchedule(station) {
    axios.post('/api/schedule', station)
    .then( 
      res => {
        this.setState({
          schedule: res.data
        })
      } 
    )
    .catch(err => {
      throw err;
    });
  }

  uniqueRoutes(sched) {
    let results = [];
    let tempObj = {};
    
    for (let i = 0; i < sched.length; i++) {
      if (!tempObj[sched[i].destination]) {
        tempObj[sched[i].destination] = true;
        results.push(sched[i].destination);
      }
    }

    return results;
  }

  componentDidMount() {
    setInterval(() => this.updateSchedule(this.state.currentStation), 15000)
  }

  render () {
    let condRender;

    if (this.state.isLoading || !this.state.currentStation.hasOwnProperty('name')){
      condRender = <h2 style={{textAlign:'center'}}>Welcome</h2>
    } else {
      condRender = <h2 style={{textAlign:'center'}}>{this.state.currentStation.name}</h2> 
    }

    return (
      <MuiThemeProvider>
        <div>
        <AppBar />
          <View />
          {condRender} 

          <div style={{display: 'grid', gridTemplateColumns:'repeat(7, 1fr)'}}>
            <div style={{gridColumn: '1/5', gridRow:1}}>
              <Station updateStation={this.updateStation} updateSchedule={this.updateSchedule}/>
            </div>

            <div style={{gridColumn: '2/4', gridRow:2}}>
              <ClosestStation lat={this.state.userLat} long={this.state.userLong} clickHandler={this.useCurrentLocation}/>
            </div>

            <div style={{gridColumn: '4/8', gridRow:1}}>
              <TrainRoutes clickHandler={this.updateRoute} schedule={this.state.schedule} uniq={this.uniqueRoutes}/>
            </div>
          </div>

            <Map center={[this.state.long, this.state.lat]} loading={this.state.isLoading}/>
          <Bulletin station={this.state.currentStation} route={this.state.currentRoute} schedule={this.state.schedule} updateSchedule={this.updateSchedule}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

