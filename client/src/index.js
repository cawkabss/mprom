import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import store from './store';
import history from './history';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const app = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

