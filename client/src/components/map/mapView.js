// import React from 'react';
// import ReactDOM from 'react-dom';
// import PubNub from 'pubnub';
// import eon from 'eon-map';
// import mapbox from 'mapbox.js';
// import mapboxgl from 'mapbox-gl';
// import mapAttributes from './map_components.js';
// import bartMap from '../map.js';

// const pubnub = new PubNub({
//     subscribeKey: mapAttributes.subscribeKey,
//     publishKey: mapAttributes.publishKey,
//     secretKey: mapAttributes.secretKey,
//     ssl: true
// });
// const channel = 'bart_buddy';


// class Map extends React.Component {
// 	constructor(props) {
// 		super (props)
//     this.state = {
//       map: {}
//     }
// 	}

// 	handleClick () {
// 		setInterval((arg) => {
//        new PubNub({
//          publishKey: mapAttributes.publishKey, // replace with your own pub-key
//          subscribeKey: mapAttributes.subscribeKey // replace with your own sub-key
//        }).publish({
//         channel: 'eon-map',
//         message: [
//         {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
//         {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
//         {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
//         {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
//         {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
//         {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
//         ]
// 	  });
//    }, 1000)
// 	}

//   componentDidMount() {
//     console.log(JSON.stringify(eon))
//      let map = eon.map({
//        pubnub: new PubNub({
//         publishKey: mapAttributes.publishKey, // replace with your own pub-key
//         subscribeKey: mapAttributes.subscribeKey // replace with your own sub-key
//       }),
//        channels: ['eon-map'],
//        id: 'map',
//        mbToken: 'pk.eyJ1IjoiamF4b25jYXJ0ZXIiLCJhIjoiY2ozYXkyeTMwMDExbTJ5cGh0N3I5M2djNiJ9.BiO4svi_FBp5s49sLjiglg',
//        mbId: 'ianjennings.l896mh2e',
//        message: function (data) {
//          map.setView(data[3].latlng);
//       }
//      })
//   }

// 	render () {
//     return (
// 			<div>
// 				<button onClick={this.handleClick.bind(this)}> Dance, Petunia </button>
// 	      <div id="map" style={{height: "500px", width: "100%" }} />   
// 		  </div> 
// 		)
// 	}
// }

// export default Map;

