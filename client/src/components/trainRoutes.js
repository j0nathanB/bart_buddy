import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import stationLat_and_Long from './station_coordinates';
import hardCodedTrainRoutes from './hardCodedTrainRoutes';

const styles = {
  customWidth: {
    width: 200,
  },
};

const items = [];

for (let j = 0; j < hardCodedTrainRoutes.length; j++) {
  items.push(<MenuItem value={j} key={j} primaryText={`${hardCodedTrainRoutes[j]}` } />);
}

class TrainRoutes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.props.userinputhandler(hardCodedTrainRoutes[value]);
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
