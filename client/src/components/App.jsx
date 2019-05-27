import React from 'react';
import ReactDOM from 'react-dom'
import GoogleApi from '../../dist/lib/GoogleApi.js';
import GoogleApiComponent from '../../dist/lib/GoogleApiComponent.jsx';
import ScriptCache from '../../dist/lib/ScriptCache.jsx';
import GoogleMap_API from '../../../config_GoogleMapAPI.js';
import example from './exampleData.js';
import $ from 'jquery';






class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      repo: [example]
    })
  }
  render() {
    return (
      <div>
        <Container loaded={true} ></Container>
      </div>
    )
  }
}




class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: [example]
    }

    this.zagatSymbol_Overlay.prototype = new this.props.google.maps.OverlayView();
    this.zagatSymbol_Overlay.prototype.onAdd = function () {
      var div = document.createElement('div');
      div.style.borderStyle = 'none';
      div.style.borderWidth = '0px';
      div.style.position = 'absolute';

      // Create the img element and attach it to the div.
      var img = document.createElement('img');
      img.src = this.image_;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.position = 'absolute';
      div.appendChild(img);

      this.div_ = div;

      // Add the element to the "overlayLayer" pane.
      var panes = this.getPanes();
      panes.overlayLayer.appendChild(div);
    };
    this.zagatSymbol_Overlay = this.zagatSymbol_Overlay.bind(this);

    this.searchByCity = this.searchByCity.bind(this);
    this.renderPoints = this.renderPoints.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  componentDidMount() {
    this.loadMap();
    console.log('city', this.props.city)
    this.searchByCity(this.props.city);
  }

  searchByCity(city) {
    console.log('searchByCity', city)
    $.ajax({
      method: 'GET',
      url: '/API/map/' + city,
      success: (data) => {
        console.log(data);
        data = JSON.parse(data);
        this.setState({
          map: data
        }, () => {
          this.renderPoints(data, this.map);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  zagatSymbol_Overlay(bounds, position, image, map) {
    // Initialize all properties.
    this.bounds_ = bounds;
    this.position_ = position;
    this.image_ = image;
    this.map_ = map;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }

  renderPoints(data, map) {

    var srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg'

    for (var i = 0; i < data.length; i++) {
      var coords = data[i];
      var latLng = new this.props.google.maps.LatLng(coords.latitude, coords.longitude);
      var bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(coords.latitude, coords.longitude),
        new google.maps.LatLng(coords.latitude + 0.2, coords.longitude + 0.2));

      // var marker = new this.zagatSymbol_Overlay(bounds, latLng, srcImage, map);
      // console.log('marker custom', marker);
      // console.log(this.zagatSymbol_Overlay.prototype)

      var marker = new this.props.google.maps.Marker({
        position: latLng,
        map: map,
        icon: {
          url: 'https://www.zagat.com/assets/img/z-logo-icon-red.svg',
          scaledSize: new google.maps.Size(30, 30)
        }
      });

    }


  }
  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const { google } = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);
      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
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
      this.forceUpdate()
    }
  }

  render() {
    return (
      <div id="refmap" ref='map'>
      </div>
    )
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    } else {
      console.log('this page is loaded')
      return (
        <Map google={this.props.google} city={this.props.match.params.name} />
      )
    }
  }
}


var TemplateGoogle = GoogleApiComponent({
  apiKey: GoogleMap_API
})(Container)

export { App, TemplateGoogle };




