import React from 'react';
import getClosestStation from './locator';


class ClosestStation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render () {
    let closestStation = getClosestStation({lat: this.props.lat, long: this.props.long});
    let condRender;

    if (this.props.loading) {
      condRender = (null);
    } else {
      condRender = <h1>Your closest station is {closestStation.name}</h1>;
    }

    return (
      <div>
        {condRender}
      </div>
    );
  }
}

export default ClosestStation;