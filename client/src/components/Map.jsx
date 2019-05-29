import React from 'react';
import ReactDOM from 'react-dom'
import GoogleApi from '../../dist/lib/GoogleApi.js';
import GoogleApiComponent from '../../dist/lib/GoogleApiComponent.jsx';
import ScriptCache from '../../dist/lib/ScriptCache.jsx';
import GoogleMap_API from '../../../config_GoogleMapAPI.js';
import example from './exampleData.js';
import $ from 'jquery';
import Marker from './Marker.jsx'


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.loadMap = this.loadMap.bind(this);

  }
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.google !== this.props.google) {
  //     this.loadMap();
  //   }
  // }
  componentWillUpdate(){
    // console.log('this is updating')
    // this.loadMap();
  }

  componentDidMount() {
    this.loadMap();
  }


  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(this.props.data[0].latitude, this.props.data[0].longitude);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        mapTypeId: 'roadmap',
        styles:
          [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#B8D4DD"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
          ]
      })
      this.map = new maps.Map(node, mapConfig);
      // this.forceUpdate() // do not need this.
    }
  }

  render() {
    if (this.map !== undefined) {
      return (
        <div id="refmap" ref='map'>
          <Marker data={this.props.data} map={this.map} updateCurrentIndex = {this.props.updateCurrentIndex}
          currentIndex={this.props.currentIndex}/>
        </div>
      )
    } else {
      return <div id="refmap" ref='map'/>
    }

  }
}


export default Map;