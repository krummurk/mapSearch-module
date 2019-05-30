import React from 'react';
import ReactDOM from 'react-dom';


class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldmarkerArr: [],
            markerArr: []
        }
        this.onClick = this.onClick.bind(this)
        console.log('the data is', this.props.data)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.data.length === 0) {

            return {
                makerArr: state.markerArr,
                oldmarkerArr: state.markerArr
            };
        }
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        var map = props.map
        var markerArr = [];
        var makeMarker = function (i, idx, cb) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(i.latitude, i.longitude),
                map: map,
                icon: {
                    url: srcImage,
                    scaledSize: new google.maps.Size(20, 20)
                }
            });
            var infowindow = new google.maps.InfoWindow({
                pixelOffset: new google.maps.Size(0, -20), // cheap fixes the constant flickering 
                position: new google.maps.LatLng(i.latitude, i.longitude),
                maxWidth: 200,
                content: "<h3>" + i.name + "</h3>"
            });

            google.maps.event.addListener(marker, 'click', e => {
                map.panTo(marker.getPosition());
                cb(idx)
            });
            google.maps.event.addListener(marker, 'mouseover', e => {
                infowindow.open(map);
            })
            google.maps.event.addListener(marker, 'mouseout', e => {
                infowindow.close(map);
            })

            markerArr.push(marker);
        }
        var items = props.data.map(
            (i, idx) => { makeMarker(i, idx, props.updateCurrentIndex) }
        );

        // if there was no markers 
        state.markerArr.forEach(i => {
            google.maps.event.clearInstanceListeners(i);
            i.setMap(null);
        })
        
        state.markerArr.length = 0;
        return {
            markerArr: markerArr,
            oldmarkerArr: state.oldmarkerArr
        };
    }

    onClick(idx) {
        this.props.updateCurrentIndex(idx)
    }

    render() {
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        var currentIndex = this.props.currentIndex;
        if (currentIndex > 0) {
            for (let k = 0; k < this.state.markerArr.length; k++) {
                this.state.markerArr[k].setIcon(
                    {
                        url: srcImage,
                        scaledSize: new google.maps.Size(20, 20)
                    });
            }
            this.state.markerArr[currentIndex].setIcon(
                {
                    url: srcImage,
                    scaledSize: new google.maps.Size(50, 50)
                });
            this.props.map.panTo(this.state.markerArr[currentIndex].getPosition());
        } else {
            this.props.map.panTo(this.state.markerArr[0].getPosition());

        }
        return (
            <div>
            </div>
        )

    }
}

export default Marker;