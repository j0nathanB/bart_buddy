import React from 'react';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }
//        <img src='http://pre12.deviantart.net/4e07/th/pre/f/2013/311/5/9/bart_and_milhouse_hi_five_by_mighty355-d6td0aj.png' height='250px'/>
  
  render () {
    return (
      <div style={{textAlign:'center'}}>
        <h1>BART Buddy</h1>
      </div>
    );
  }
}

export default View;