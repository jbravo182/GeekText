import React, {Component} from 'react';
import Header from './Header'
import {Route, HashRouter} from "react-router-dom";
import SearchArea from './SearchArea';

//import AuthorPage from './AuthorPage';

//import ProfileSettings from './ProfileManagement/ProfileSettings';

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