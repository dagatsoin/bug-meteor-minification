import React, { PropTypes, Component } from 'react'
import { findDOMNode } from 'react-dom'

import mapboxgl from './mapbox-gl'

class Map extends Component {
  render() {
    return (<div ref="map">{this.props.children}</div>)
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: findDOMNode(this.refs.map),
      style: 'mapbox://styles/mapbox/streets-v8',
    })
  }
}

export default Map
