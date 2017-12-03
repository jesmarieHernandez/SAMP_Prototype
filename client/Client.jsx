import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from '../src/App/Routes.jsx';
import ContextWrapper from '../src/App/ContextWrapper.jsx';

const WrappedApp = (props) => (
    <ContextWrapper >
        <Router history={browserHistory} >
            {routes}
        </Router>
    </ContextWrapper>
);

const contentNode = document.getElementById('contents');
ReactDOM.render(<WrappedApp initialState={window.__INITIAL_STATE__} />, contentNode);

if(module.hot) {
    module.hot.accept();
}