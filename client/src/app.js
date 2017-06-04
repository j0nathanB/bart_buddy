import React from 'react';
import ReactDOM from 'react-dom';

//import Announcement from './components/Announcement.js';
import View from './components/view';
import Bulletin from './components/bulletin';
import Station from './components/station';
import TrainRoutes from './components/trainRoutes';
import Map from './components/map.js';
import ClosestStation from './components/closestStation';
import stationLat_and_Long from './components/station_coordinates';
import hardCodedTrainRoutes from './components/hardCodedTrainRoutes';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import axios from 'axios';

injectTapEventPlugin();


const getCoords = () => new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({ lat: position.coords.latitude, long: position.coords.longitude });
  });
});

console.log("hardCodedTrainRoutes[0] =", hardCodedTrainRoutes[0]);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      lat: 0,
      long: 0,
      isLoading: false,
      currentStation: stationLat_and_Long[0],
      trainRoute: hardCodedTrainRoutes[0]
    };
    this.testClick = this.testClick.bind(this);
    this.trainRouteUpdate = this.trainRouteUpdate.bind(this);
    this.stationUpdate = this.stationUpdate.bind(this);
    this.simplePost = this.simplePost.bind(this);
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

  simplePost(newTrainRoute, newStation) {
    //var data = "hello BARTBuddy World";
    console.log("simplePost called, newTrainRoute = ", newTrainRoute, " newStation = ", newStation);
    axios.post('/api', { 
      trainRoute: newTrainRoute, 
      currentStation: newStation
    }).then(res => {
      console.log(res);
    })
    .catch(err => {
      throw err;
    });
  }

  trainRouteUpdate(data) {
    //var data = "hello BARTBuddy World";
    console.log("trainRouteUpdate called, data = ", data);
    this.setState({trainRoute: data});
    this.simplePost(data, this.state.currentStation);
  }

  stationUpdate(data) {
    //var data = "hello BARTBuddy World";
    console.log("stationUpdate called, data = ", data);
    this.setState({station: data});
    this.simplePost(data, this.state.currentStation);
  }

  testClick(data) {
    console.log("testClick called, data = ", data);
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <ClosestStation lat={this.state.lat} long={this.state.long} loading={this.state.isLoading}/>
          <Bulletin />
          <Station />
          <TrainRoutes userinputhandler={this.trainRouteUpdate}/>
          <Map />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

