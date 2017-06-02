import React from 'react';
import getClosestStation from './locator';

class ClosestStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  //make API call here on component didMount

  render () {
    let closestStation = getClosestStation({lat: this.props.lat, long: this.props.long});
    let condRender;

    if (this.props.loading) {
      condRender = (null);
    } else {
      condRender = <h1>{closestStation.name} is about {closestStation.userTime} minutes away</h1>;
    }

    return (
      <div>
        {condRender}
      </div>
    );
  }
}

export default ClosestStation;