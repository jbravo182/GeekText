import React, {Component} from 'react';
import Header from './Header'
import {Route, HashRouter} from "react-router-dom";
import SearchArea from './SearchArea';

class App extends Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Header></Header>
                        <div id="route-container">
                            <Route path="/search" component={SearchArea}/>
                        </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;