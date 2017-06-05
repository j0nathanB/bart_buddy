import React from 'react';
import stationList from './station_coordinates'
import destinations from './destinations'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class Bulletin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      schedule: []
    };
  }

  render () {
    return (
      <div>
        <h1>Next:</h1>
        {this.props.schedule.filter(
          destination => destination.destination === this.props.route
          ).map( (arrival, index) => 
            <Card key={index}>
              <CardTitle key={index} title={this.props.route + ": " + arrival.minutes + " minutes"}/>
            </Card>
            )
        }
      </div>
    );
  }
}

export default Bulletin;
