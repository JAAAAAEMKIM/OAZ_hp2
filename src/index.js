// Client-side 진입하는 부분

import React from 'react';
import ReactDOM from 'react-dom';
// import { Router, Route} from 'react-router';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { createBrowserHistory } from 'history'
import 'style.css';
import { oazHome } from 'components'; 
import {App, Home, Login, Register, NoticeHome} from 'containers';
import {Board} from 'components'

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                {/* some things can be done here */}
                    <Route exact path="/" component={oazHome}/>
                    <Route exact path="/home" component={App}/>
                    <Route exact path="/home" component={Board}/>

                    <Route exact path="/guessipan" component={App}/>
                    {/* App이 Nav bar */}
                    <Route exact path="/guessipan" component={Home}/>
                    
                    <Route exact path="/notice" component={App}/>
                    <Route exact path="/notice" component={NoticeHome}/>
                    
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>     
            </div>
        </BrowserRouter>
    </Provider>, rootElement
);