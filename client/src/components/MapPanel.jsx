import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import Map from './Map.jsx';
import Search from './Search.jsx';
import Panel from './Panel.jsx';
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    @import url('@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');
    font-family: 'Lato', sans-serif;
  }
`

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh
  // overflow:hidden;
`;

const List = styled.section`
  padding: 0.75rem;
  margin: 0 0 0.25rem;
  height: 80vh;  /* The height is 400 pixels */
  width: 50%;  /* The width is the width of the web page */
  overflow-y: auto;
`;
const MapStyle = styled.section`
  padding: 0.75rem;
  margin: 0 0 0.25rem;
  // height: 100vh;  /* The height is 400 pixels */
  width: 50%;  /* The width is the width of the web page */
  // overflow-y: auto;

  // justify-items: stretch
  // overflow: hidden;

`;

const Flexrow = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 80vh;  /* The height is 400 pixels */


`
const Flexcolumn = styled.div`
  width: ${(props) => props.size / 2 * 100}vw;
  margin-left: 1rem;
  margin-right: 1rem;
  flex-direction: column;
`




class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentIndex: -1,
      searchStr: ""
    }
    this.searchByCity = this.searchByCity.bind(this);
    this.updateCurrentIndex = this.updateCurrentIndex.bind(this);
  }
  componentDidMount() {
    this.searchByCity(this.props.match.params.name);
  }


  updateCurrentIndex(i) {
    this.setState({
      currentIndex: i
    })
  }
  getStr(e) {
    e.preventDefault();
    this.setState(
      { searchStr: e.target.value }
    )
  }
  // https://stackoverflow.com/questions/23123138/perform-debounce-in-react-js
  searchByCity(city) {
    $.ajax({
      method: 'GET',
      url: '/API/map/' + city,
      success: (data) => {
        data = JSON.parse(data);
        this.setState({
          data: data,
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  render() {
    if (!this.props.loaded || this.state.data.length === 0) {
      return <div>Loading...</div>
    } else {
      return (
        <StyleContainer>
          <GlobalStyles />
          <Search searchByCity = {this.searchByCity}/>
          <Flexrow>
            <List><Panel data={this.state.data} currentIndex={this.state.currentIndex}
              updateCurrentIndex={this.updateCurrentIndex} /></List>
            <MapStyle>
              <Map google={this.props.google} 
                    inheritMap = {this.props.map}
                    city={this.props.match.params.name} data={this.state.data}
                updateCurrentIndex={this.updateCurrentIndex} currentIndex={this.state.currentIndex} />
            </MapStyle>
          </Flexrow>
        </StyleContainer >
      )
    }
  }
}
export default Container;


