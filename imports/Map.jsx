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

    this.map.doubleClickZoom.disable()

    if (this.props.zoom) {
      this.map.setZoom(this.props.zoom)
    }

    if (this.props.center) {
      this.map.setCenter(this.props.center)
    }

    if (this.props.onMove) {
      this.map.on('move', () => {
        this.props.onMove(this.map.getCenter().toArray(), this.map.getZoom(), this.map.getBounds().toArray())
      })
    }

    if (this.props.onDoubleClick) {
      this.map.on('dblclick', (event) => {
        this.props.onDoubleClick(event.lngLat.lng, event.lngLat.lat)
      })
    }

    this.map.on('load', () => {
      this.loaded = true

      this.map.addSource('data', {
        type: 'geojson',
        data: this.props.data,
      })

      this.map.addLayer({
        id: 'data',
        type: 'symbol',
        source: 'data',
        layout: {
          'icon-image': '{symbol}-15',
          'text-field': '{title}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top',
        },
      })
    })
  }

  componentWillUnmount() {
    this.map.remove()
  }

  componentDidUpdate(prevProps) {
    if (!this.loaded || _.isEqual(prevProps.data, this.props.data)) {
      return
    }

    this.map.getSource('data').setData(this.props.data)
  }
}

Map.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Map
