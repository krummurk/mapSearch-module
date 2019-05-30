import React from 'react';
import ReactDOM from 'react-dom';


class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: -1,
            markerArr: []
        }
        this.onClick = this.onClick.bind(this)
        console.log('the data is', this.props.data)
    }
    // getSnapshotBeforeUpdate(){
    //     console.log('component getSnapshotBeforeUpdate')
    // }
    getSnapshotBeforeUpdate() {
        console.log('component getSnapshotBeforeUpdate')
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        // const { data, map } = this.props;
        var map = this.props.map
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
                pixelOffset: new google.maps.Size(0, -10), // cheap fixes the constant flickering 
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
        var items = this.props.data.map(
            (i, idx) => { makeMarker(i, idx, this.onClick) }
        );
        this.makeArr = markerArr
        this.props.map.panTo(markerArr[0].getPosition());
        return {
            
        }

    }
    componentDidMount() {
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        // const { data, map } = this.props;
        var map = this.props.map
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
                pixelOffset: new google.maps.Size(0, -10), // cheap fixes the constant flickering 
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
        var items = this.props.data.map(
            (i, idx) => { makeMarker(i, idx, this.onClick) }
        );
        this.setState({
            markerArr: markerArr
        })

    }
    onClick(idx) {
        console.log('clicking')
        this.setState({
            current: idx
        }, () => {
            this.props.updateCurrentIndex(idx)
        })

    }

    render() {
        console.log('in this marker component, data is', this.props.data)
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
        }
        return (
            <div>
            </div>
        )

    }
}

export default Marker;