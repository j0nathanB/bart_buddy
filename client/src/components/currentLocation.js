import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
  float: 'none'
};

class locationButton extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return ( 
      <div>
        <RaisedButton fullWidth={true} label="Use Current Location" primary={true} style={style} onTouchTap={this.props.clickHandler}/>
      </div>
    )
  }
}

export default locationButton;
