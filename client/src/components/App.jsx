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
          this.renderPoints(data);
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  renderPoints(data){
    for (var i = 0; i < data.length; i++) {
      var coords = data[i];
      var latLng = new google.maps.LatLng(coords.latitude,coords.longitude);
      var marker = new google.maps.Marker({
        position: latLng,
        map: this.map
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
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#263c3f' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#6b9a76' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#38414e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#212a37' }]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9ca5b3' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#746855' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#1f2835' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#f3d19c' }]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{ color: '#2f3948' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#d59563' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#17263c' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#515c6d' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#17263c' }]
          }
        ]

      })
      this.map = new maps.Map(node, mapConfig);




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




