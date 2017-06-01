import React from 'react';
import ReactDOM from 'react-dom';
import PubNub from 'pubnub';
import eon from 'eon-map';
import mapbox from 'mapbox.js';
import mapboxgl from 'mapbox-gl';
import mapAttributes from './map_components.js';

const pubnub = new PubNub({
    subscribeKey: mapAttributes.subscribeKey,
    publishKey: mapAttributes.publishKey,
    secretKey: mapAttributes.secretKey,
    ssl: true
});
const channel = 'bart_buddy';


class Map extends React.Component {
	constructor(props) {
		super (props)
	}

	componentDidMount() {
		//here we can add the bart api connection to the PubNub API
	}

	handleClick () {
		setInterval((arg) => {
       new PubNub({
         publishKey: mapAttributes.publishKey, // replace with your own pub-key
         subscribeKey: mapAttributes.subscribeKey // replace with your own sub-key
       }).publish({
        channel:  'eon-map',
        message: [
        {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
        {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
        {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
        {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
        {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
        {"latlng":[ 33 * Math.random(), -89 * Math.random()]},
        ]
	  });
   }, 1000)
	}


	// componentWillMount () {
	// 	pubnub.subscribe({
 //    channel: channel,
 //    restore: true,
 //    connect: () => this.connect(),
 //    message: (m) => this.success(m) //callbak in this case
 //  });
	// }

	//  publish() {
	   
	//     pubnub = new PubNub({
	//         publishKey : publishKey,
	//         subscribeKey : subscribeKey
	//     })
	       
	//     function publishSampleMessage() {
	//         console.log("Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.");
	//         var publishConfig = {
	//             channel : "hello_world",
	//             message : "Hello from PubNub Docs!"
	//         }
	//         pubnub.publish(publishConfig, function(status, response) {
	//             console.log(status, response);
	//         })
	//     }
	       
	//     pubnub.addListener({
	//         status: function(statusEvent) {
	//             if (statusEvent.category === "PNConnectedCategory") {
	//                 publishSampleMessage();
	//             }
	//         },
	//         message: function(message) {
	//             console.log("New Message!!", message);
	//         },
	//         presence: function(presenceEvent) {
	//             // handle presence
	//         }
	//     })      
	//     console.log("Subscribing..");
	//     pubnub.subscribe({
	//         channels: ['hello_world'] 
	//     });
	// };
	
	render ( ) {
		return (
			<div>
				<h1 style={{color: "red" }}>I am a map and I have to be called from view.js 
				  as well as have my hot link in index ejs!!!!!!!!!!!!</h1>
				  <button onClick={this.handleClick.bind(this)}> Dance Bitch </button>
	      <div id="html-id" style={{height: "500px", width: "100%" }}>   
       </div>
		  </div> 
		)
	}
}

export default Map;

