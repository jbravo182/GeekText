import React, {Component} from 'react';
import Header from './Header'
import {Route, HashRouter} from "react-router-dom";
import SearchArea from './SearchArea';
import HomePage from './HomePage';
import Profile from './Profile';

class App extends Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Header></Header>
                        <div id="route-container">
                            <Route path="/search" component={SearchArea}/>
                            <Route path="/HomePage" component={HomePage}/>
                            <Route path="/Profile" component={Profile}/>
                        </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;