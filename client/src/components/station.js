import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import stationList from './station_coordinates'

const styles = {
  customWidth: {
    width: 275,
  },
};

const items = [];

//items.push(<MenuItem value={stationList.length} key={stationList.length} primaryText={"Use Location" } />);

for (let i = 0; i < stationList.length; i++) {
  items.push(<MenuItem value={i} key={i} primaryText={`${stationList[i].name}` } />);
}


class station extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      station: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, index, value) {
    this.setState({value: value});
    let station = stationList.find( (element) => element.name === items[index].props.primaryText)
    this.props.updateStation(station);
    this.props.getSchedule(station);
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