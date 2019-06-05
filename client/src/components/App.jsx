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
import Container from "./MapPanel.jsx"



var TemplateGoogle = GoogleApiComponent({
  apiKey: GoogleMap_API
})(Container)

export { TemplateGoogle };




