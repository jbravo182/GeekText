import React, {Component} from 'react';
import Header from './Header'
import {Route, HashRouter} from "react-router-dom";
import SearchArea from './SearchArea';
import LoginForm from './components/LoginForm';
import HomePage from './HomePage';

class App extends Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Header></Header>
                        <div id="route-container">
                            <Route path="/search" component={SearchArea}/>
                            <Route path="/LoginForm" component={LoginForm}/>
                            <Route path="/HomePage" component={HomePage}/>
                        </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;