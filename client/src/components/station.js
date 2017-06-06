import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import stationList from './station_coordinates'

const styles = {
  customWidth: {
    width: 275,
  }
};

const items = [];

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
    let station = stationList.find( (element) => element.name === items[index].props.primaryText)
    this.props.updateStation(station);
    this.props.updateSchedule(station);
  }

  render() {
    return (
        <div style={{display: 'grid', gridTemplateColumns:'repeat(4, 1fr)'}}>
          <div style={{gridColumn: '1/3', gridRow:1, margin:'auto'}}><h3>Select Station: </h3></div>
          <div style={{gridColumn: '3', gridRow:1, margin:'auto'}}>
          <DropDownMenu maxHeight={250} value={this.state.value} onChange={this.handleChange} style={styles.customWidth}>
            {items}
          </DropDownMenu>
          </div>
        </div>
    );
  }
}

export default station