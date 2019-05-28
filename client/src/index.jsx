import React from 'react';
import ReactDOM from 'react-dom';
import {TemplateGoogle} from './components/App.jsx'
import { BrowserRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(<BrowserRouter>
    <Route path = "/map/:name" component = {TemplateGoogle} />
    </BrowserRouter>, document.getElementById('app'));




// ReactDOM.render(<TemplateGoogle />
//     , document.getElementById('app'));
