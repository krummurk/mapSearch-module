import React from 'react';
import ReactDOM from 'react-dom';


class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: -1,
            markerArr: []
        }
        console.log('props', this.props)
        this.onClick = this.onClick.bind(this)
    }
    componentDidMount(){
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
        this.setState({
            current: idx
        }, () => {
            // console.log(idx);
            this.props.updateCurrentIndex(idx)
            // console.log(this.state.current)
        })

    }

    render() {
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        console.log(this.state.markerArr)

        if (this.state.current > 0) {
            for (let k = 0; k < this.state.markerArr.length; k++) {
                this.state.markerArr[k].setIcon(
                    {
                        url: srcImage,
                        scaledSize: new google.maps.Size(20, 20)
                    });
            }
            this.state.markerArr[this.state.current].setIcon(
                {
                    url: srcImage,
                    scaledSize: new google.maps.Size(50, 50)
                });
        }
        return (
            <div>
                {/* {items} */}
            </div>
        )

    }
}

export default Marker;