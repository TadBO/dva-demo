import React, { Component } from 'react';
import { connect } from "dva";
class Epic extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <h1>Epic</h1>
    );
  }
}

export default connect()(Epic);
