import React from 'react';
import ReactDOM from 'react-dom';

//import Announcement from './components/Announcement.js';
import View from './components/view';
import Bulletin from './components/bulletin';
import Station from './components/station';
import TrainRoutes from './components/trainRoutes';
import Map from './components/map.js';
import ClosestStation from './components/closestStation';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
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
      currentStation: ''
    };
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

  render () {
    return (
      <MuiThemeProvider>
        <div>
          <ClosestStation lat={this.state.lat} long={this.state.long} loading={this.state.isLoading}/>
          <View />
          <Bulletin />
          <Station />
          <TrainRoutes />
          <Map />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

