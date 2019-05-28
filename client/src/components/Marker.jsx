import React from 'react';
import ReactDOM from 'react-dom'


class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.toggleLayer = this.toggleLayer.bind(this)
    }

    toggleLayer(i) {
        var srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';

        for (var j = 0; j < this.props.markers.length; j++) {
          console.log('markers', this.props.markers[j]);
          if (j !== i) {
            console.log(google.maps)
            this.props.markers[j].setIcon(
                this.props.markers[j],
              {
                url: srcImage,
                scaledSize: new google.maps.Size(20, 20)
              }
            )
  
          }
        }
      }
  
    render() {
        var toggleLayer = this.toggleLayer
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        const { data, i, map,markers } = this.props;
        var coords = data[i];
        var string = data[i].name;
        var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
        var infowindow = new google.maps.InfoWindow({
            position: latLng,
            maxWidth: 200,
            content: "<h3>" + string + "</h3>"
        });
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                url: srcImage,
                scaledSize: new google.maps.Size(30, 30)
            }
        });
        google.maps.event.addListener(marker, 'click', e => {
            var size;
            if (marker['icon']['scaledSize']['height'] === 30) {
                size = new google.maps.Size(40, 40)
            } else {
                size = new google.maps.Size(30, 30)
            }
            marker.setIcon(
                {
                    url: srcImage,
                    scaledSize: size
                });
            map.setZoom(14);
            infowindow.open(map);
            console.log(toggleLayer)
            this.toggleLayer(i);

        });
        return (
            <div></div >
        )
    }
}

export default Marker;