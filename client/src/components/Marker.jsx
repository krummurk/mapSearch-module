import React from 'react';
import ReactDOM from 'react-dom'


class Marker extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        const { data, i, map, markers, toggleLayer, current } = this.props;
        var coords = data[i];
        var string = data[i].name;
        var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
        var infowindow = new google.maps.InfoWindow({
            pixelOffset: new google.maps.Size(0, -10), // cheap fixes the constant flickering 
            position: latLng,
            maxWidth: 200,
            content: "<h3>" + string + "</h3>"
        });
        // var sizing = (current) ?  new google.maps.Size(20, 20) : new google.maps.Size(10, 10) 
        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: {
                url: srcImage,
                scaledSize: new google.maps.Size(20, 20)
            }
        });
        google.maps.event.addListener(marker, 'click', e => {
            // var size;
            // if (marker['icon']['scaledSize']['height'] === 30) {
            //     size = new google.maps.Size(40, 40)
            // } else {
            //     size = new google.maps.Size(30, 30)
            // }
            // marker.setIcon(
            //     {
            //         url: srcImage,
            //         scaledSize: size
            //     });
            map.setZoom(14);
            toggleLayer(i);

        });

        google.maps.event.addListener(marker, 'mouseover', e => {
            infowindow.open(map);
        })

        google.maps.event.addListener(marker, 'mouseout', e => {
            infowindow.close(map);
        })
        return (
            <div></div >
        )
    }
}

export default Marker;