import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import stationLat_and_Long from './station_coordinates';

const styles = {
  customWidth: {
    width: 275,
  },
};

class TrainRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    let destinations = this.props.uniq(this.props.schedule);

    this.props.clickHandler(destinations[value]);
  }

  render() {
    let destinations = this.props.uniq(this.props.schedule);

    return (
        <div style={{display: 'grid', gridTemplateColumns:'repeat(4, 1fr)'}}>
          <div style={{gridColumn: '2/4', gridRow:1, margin:'0 auto'}}><h3>Select Route: </h3></div>
          <div style={{gridColumn: '4', gridRow:1, margin:'auto'}}>
          <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange} style={styles.customWidth}>
            {destinations.map((dest, index) => <MenuItem value={index} key={dest} primaryText={dest} />)}
          </DropDownMenu></div>
        </div>
    );
  }
}

export default TrainRoutes
