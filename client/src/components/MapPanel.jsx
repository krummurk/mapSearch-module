import React from 'react';
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import $ from 'jquery';
import GoogleApi from '../../dist/lib/GoogleApi.js';
import GoogleApiComponent from '../../dist/lib/GoogleApiComponent.jsx';
import ScriptCache from '../../dist/lib/ScriptCache.jsx';
import GoogleMap_API from '../../../config_GoogleMapAPI.js';
import Map from './Map.jsx';
import Panel from './Panel.jsx';
import { createGlobalStyle } from "styled-components";
import _ from 'underscore';
// import _ from 'lodash'
const CustomInput = styled.input`
font-size: 1em;
text-align: left;
border: 1px solid #EFEFEF;
padding: 0.5em;
width: 100%;
border-radius: 10px;
`;

const SearchBarWrapper = styled.div`
display: flex;
align-items: stretch;
justify-content: center;
width: 280px;
align-self: center;
padding: 2rem;
&:focus {outline:0};


`

const Button = styled.button`
  align-self: center;
  border: 1px solid #d8d9db;
  font-family: 'Montserrat',sans-serif;
  font-size: .875rem;
  font-weight: 500;
  line-height: 1;
  border-radius: 1rem;
  :hover {
    border: 2px solid red;
  }
  &:focus {outline:0};
  color: black;
  // margin: 0 0.5em;
  // padding: 0.25em 1em;
  height: 35px;
  width: 35px;
`

const PrimaryColumn = styled.div`
flex: 2
`
const SecondaryColumn = styled.div`
flex: 1
`





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
const ZagatLogoPaths = styled.g`
`;

const ZagatLogoBoxDiv = styled.div`
  background-color: white ;
  fill: #b70038;
  :hover {
    background-color: #b70038;
    fill:white
  }
`
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
const TopBar = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 10vh;  /* The height is 400 pixels */

`
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
    this.getStr = this.getStr.bind(this);
    // this.getStr = _.debounce(this.getStr, 1000);
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
    console.log(e.target.value);
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
          <TopBar>
            <ZagatLogoBoxDiv>
              <svg xmlns="http://www.w3.org/2000/svg" width="250" height="100" viewBox="0 0 145 33">
                <ZagatLogoPaths>
                  <ZagatLogoPaths>
                    <path d="M36.7 27.4L34.4 32.1 36.7 32.1 38.1 29.3 49.4 29.3 50.7 32.1 53.1 32.1 50.8 27.4 36.7 27.4"></path>
                    <path d="M43.6 0.1L27.5 32.1 29.9 32.1 43.8 4 57.7 32.1 60.2 32.1 44 0.1 43.6 0.1"></path>
                    <path d="M1.9 7.5L1.9 9.5 11.9 9.5 0.1 31.7 0.1 32.1 24.8 32.1 24.8 30.2 3.2 30.2 15.3 7.5 1.9 7.5"></path>
                    <path d="M1.9 3.7L21.8 3.7 9.7 26.4 24.8 26.4 24.8 24.4 13 24.4 24.9 2.1 24.9 1.7 1.9 1.7 1.9 3.7"></path>
                    <path d="M43.8 16.4L46.4 22.3 41.1 22.3 43.8 16.4 43.8 16.4ZM38.3 23.9L49.2 23.9 43.8 12.8 38.3 23.9 38.3 23.9Z"></path>
                    <path d="M91.6 14.1L73.6 14.1 73.6 16 89.6 16 89.6 16.7C89.6 24.6 84 30.9 76.1 30.9 68.4 30.9 62.4 24.8 62.4 16.9 62.4 9 68.6 2.9 76.6 2.9 80.2 2.9 83.7 4 86.6 6.3L87.5 4.4C84.4 2.1 80.6 1 76.6 1 67.4 1 60.2 7.9 60.2 16.9 60.2 25.9 67.2 32.8 76.1 32.9 85.4 32.9 91.6 25.7 91.6 16.4L91.6 14.1"></path>
                    <path d="M135.3 7.5L135.3 32.1 137.4 32.1 137.4 9.5 144.9 9.5 144.9 7.5 135.3 7.5"></path>
                    <path d="M121.5 9.5L129 9.5 129 32.1 131.1 32.1 131.1 7.5 121.5 7.5 121.5 9.5"></path>
                    <path d="M121.5 1.7L144.9 1.7 144.9 3.7 121.5 3.7 121.5 1.7Z"></path>
                    <path d="M76.6 9C79.3 9 81.8 10 83.8 11.9L84.7 10C82.6 8.1 79.7 7 76.6 7 71 7 66.7 11.3 66.7 16.9 66.7 22.6 70.8 27 76.1 27 81.1 27 84.6 23.9 84.9 19.2L73.6 19.2 73.6 21.1 82.5 21.1C81.6 23.7 79.1 25.1 76.1 25.1 72 25.1 68.8 21.5 68.8 16.9 68.8 12.4 72.2 9 76.6 9"></path>
                    <path d="M107.5 0.1L91.4 32.1 93.8 32.1 107.7 4 121.6 32.1 124.1 32.1 107.9 0.1 107.5 0.1"></path>
                    <path d="M100.6 27.4L98.3 32.1 100.6 32.1 102 29.3 113.3 29.3 114.6 32.1 117 32.1 114.7 27.4 100.6 27.4"></path>
                    <path d="M107.7 16.4L110.3 22.3 105 22.3 107.7 16.4 107.7 16.4ZM102.2 23.9L113.1 23.9 107.7 12.8 102.2 23.9 102.2 23.9Z"></path>
                  </ZagatLogoPaths>
                </ZagatLogoPaths>
              </svg>
            </ZagatLogoBoxDiv>
            <SearchBarWrapper>
              <PrimaryColumn>
                <CustomInput
                  type="text"
                  placeholder="City"
                  onChange={this.getStr}
                />
              </PrimaryColumn>
              <SecondaryColumn>
                <Button onClick={e => { this.searchByCity(this.state.searchStr) }} />
              </SecondaryColumn>
            </SearchBarWrapper>
          </TopBar>
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