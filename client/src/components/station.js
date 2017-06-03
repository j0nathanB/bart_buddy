import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import stationLat_and_Long from './station_coordinates'

const styles = {
  customWidth: {
    width: 150,
  },
};

const items = [];

for (let j = 0; j < stationLat_and_Long.length; j++) {
  items.push(<MenuItem value={j} key={j} primaryText={`${stationLat_and_Long[j].name}` } />);
}
items.push(<MenuItem value={stationLat_and_Long.length} key={stationLat_and_Long.length} primaryText={"Use Location" } />);

class station extends React.Component {

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
      <DropDownMenu maxHeight={250} value={this.state.value} onChange={this.handleChange} style={styles.customWidth}>
        {items}
      </DropDownMenu>
    );
  }
}

export default station