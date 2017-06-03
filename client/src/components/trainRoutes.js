import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import stationLat_and_Long from './station_coordinates'

const styles = {
  customWidth: {
    width: 200,
  },
};

var hardCodedTrainRoutes = [ 
  'select-route',
  'PITT-SFIA',
  'DALY-DUBL',
  'DALY-WARM',
  'DUBL-DALY',
  'WARM-DALY',
  'WARM-RICH',
  'MLBR-RICH',
  'RICH-WARM',
  'RICH-MLBR',
  'SFIA-PITT',
  'COLS-OAKL',
  'OAKL-COLS' ];

// PITT-SFIA

const items = [];

for (let j = 0; j < hardCodedTrainRoutes.length; j++) {
  items.push(<MenuItem value={j} key={j} primaryText={`${hardCodedTrainRoutes[j]}` } />);
  console.log()
}

class TrainRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
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
