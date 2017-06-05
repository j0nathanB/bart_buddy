import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import stationLat_and_Long from './station_coordinates';
import destinations from './destinations';

const styles = {
  customWidth: {
    width: 275,
    float:'right'
  },
};

const items = [];

for (let j = 0; j < destinations.length; j++) {
  items.push(<MenuItem value={j} key={j} primaryText={`${destinations[j]}` } />);
}

class TrainRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.clickHandler(destinations[value]);
    this.setState({value: value});
  }

  render() {
    return (
      <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleChange} style={styles.customWidth}>
        {items}
      </DropDownMenu>
    );
  }
}

export default TrainRoutes
