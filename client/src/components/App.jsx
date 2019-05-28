import React from 'react';
import ReactDOM from 'react-dom'
import GoogleApi from '../../dist/lib/GoogleApi.js';
import GoogleApiComponent from '../../dist/lib/GoogleApiComponent.jsx';
import ScriptCache from '../../dist/lib/ScriptCache.jsx';
import GoogleMap_API from '../../../config_GoogleMapAPI.js';
import example from './exampleData.js';
import $ from 'jquery';
import Marker from './Marker.jsx'





class App extends React.Component {
  constructor() {
    super();
    this.state = ({
      repo: [example],
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
      map: [example],
      item: [],
      targetTrue : []
    }

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


  renderPoints(data, map) {
    var srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
    for (var i = 0; i < data.length; i++) {
      var newState = this.state.item;
      newState.push({key: i.toString(),  map:map,  data: data, index:i, current:false})

      // toggleLayer(i) {
      //   var srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';

      //   for (var j = 0; j < this.props.markers.length; j++) {
      //     console.log('markers', this.props.markers[j]);
      //     if (j !== i) {
      //       console.log(google.maps)
      //       this.props.markers[j].setIcon(
      //           this.props.markers[j],
      //         {
      //           url: srcImage,
      //           scaledSize: new google.maps.Size(20, 20)
      //         }
      //       )
  
      //     }
      //   }
      // }
      // this.toggleLayer = this.toggleLayer.bind(this)



    }
    this.setState({
      item: newState
    })
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
        {this.state.item.map( i=>
          <Marker key={i.key} map={i.map} data={i.data} i={i.index} current={i.current}/>
        )}
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
        <div>
          <Map google={this.props.google} city={this.props.match.params.name} />
        </div>
      )
    }
  }
}


var TemplateGoogle = GoogleApiComponent({
  apiKey: GoogleMap_API
})(Container)

export { App, TemplateGoogle };




