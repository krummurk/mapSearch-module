import React from 'react';
import ReactDOM from 'react-dom'
import styled from 'styled-components';
import $ from 'jquery';
import GoogleApi from '../../dist/lib/GoogleApi.js';
import GoogleApiComponent from '../../dist/lib/GoogleApiComponent.jsx';
import ScriptCache from '../../dist/lib/ScriptCache.jsx';
import GoogleMap_API from '../../../config_GoogleMapAPI.js';
import example from './exampleData.js';
import Marker from './Marker.jsx'
import Map from './Map.jsx'
import Panel from './Panel.jsx'

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.section`
  padding: 0.75rem;
  border-bottom: 1px solid #d8d9db;
  margin: 0 0 0.25rem;
`;

const Flexrow = styled.div`
  background-color: white;
  display: flex;
`
const Flexcolumn = styled.div`
  width: ${(props) => props.size / 2 * 100}vw;
  margin-left: 1rem;
  margin-right: 1rem;
`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.searchByCity = this.searchByCity.bind(this);
  }

  componentDidMount() {
    this.loadMap();
    this.searchByCity(this.props.match.params.name);
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
          data: data,
        }, () => {
        })
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  render() {
    return (
        <StyleContainer>
          <Panel/>
        </StyleContainer>
    )
  }
}

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.searchByCity = this.searchByCity.bind(this);
  }
  componentDidMount() {
    this.searchByCity(this.props.match.params.name);
  }

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
    if (!this.props.loaded || this.state.data.length===0) {
      return <div>Loading...</div>
    } else {
      return (
        <StyleContainer>
          <Wrapper><Panel data={this.state.data} /></Wrapper>
          <Wrapper><Map google={this.props.google} city={this.props.match.params.name} data={this.state.data} /></Wrapper>
        </StyleContainer>
      )
    }
  }
}


var TemplateGoogle = GoogleApiComponent({
  apiKey: GoogleMap_API
})(Container)

export { App, TemplateGoogle };




