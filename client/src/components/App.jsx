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
    super(props)
  }
  render() {
    if (!this.props.loaded) {
      return <div>Loading...</div>
    } else {
      // console.log('this page is loaded')
      return (
        <StyleContainer>
          <Wrapper><Panel/></Wrapper>
          <Wrapper><Map google={this.props.google} city={this.props.match.params.name} /></Wrapper>
        </StyleContainer>
      )
    }
  }
}


var TemplateGoogle = GoogleApiComponent({
  apiKey: GoogleMap_API
})(Container)

export { App, TemplateGoogle };




