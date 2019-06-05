import React from 'react';


class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markerArr: [],
            infowindowArr: [],
            prev: -1,
            current: -1
        }
    }
    static getDerivedStateFromProps(props, state) {
        if (props.data.length === 0) {
            return {
                makerArr: state.markerArr,
                infowindowArr: state.infowindowArr,
                prev: state.prev,
                current: state.current
            };
        }
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        var map = props.map
        var markerArr = [];
        var infowindowArr = [];
        var makeMarker = function (i, idx, cb) {
            console.log(idx)
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
            https://stackoverflow.com/questions/50566196/infowindow-close-not-working-on-google-maps-using-reactjs
            google.maps.event.addListener(marker, 'mouseout', e => {
                infowindow.close();
            })
            markerArr.push(marker);
            infowindowArr.push(infowindow);
        }
        var items = props.data.map(
            (i, idx) => { makeMarker(i, idx, props.updateCurrentIndex) }
        );

        // if there was no markers 
        state.markerArr.forEach(i => {
            google.maps.event.clearInstanceListeners(i);
            i.setMap(null);
        })

        state.infowindowArr.forEach(i => {
            i.close();
        })
        state.markerArr.length = 0;
        return {
            markerArr: markerArr,
            infowindowArr: infowindowArr,
            prev: state.current,
            current: props.currentIndex
        };
    }


    render() {
        const srcImage = 'https://www.zagat.com/assets/img/z-logo-icon-red.svg';
        var currentIndex = this.props.currentIndex;
        var prevIndex = this.state.prev;
        if (currentIndex > -1) {
            // for (let k = 0; k < this.state.markerArr.length; k++) {
            //     this.state.markerArr[k].setIcon(
            //         {
            //             url: srcImage,
            //             scaledSize: new google.maps.Size(20, 20)
            //         });
            // }
            this.state.markerArr[currentIndex].setIcon(
                {
                    url: srcImage,
                    scaledSize: new google.maps.Size(50, 50)
                });
            if (prevIndex > -1) {
                this.state.markerArr[prevIndex].setIcon(
                    {
                        url: srcImage,
                        scaledSize: new google.maps.Size(20, 20)
                    });
            }
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