import React, {Component} from 'react';
import Header from './Header'
import {Route, HashRouter} from "react-router-dom";
import SearchArea from './SearchArea';
import BookList from './BookList';
import HomePage from './HomePage';
import Profile from './Profile';
import ShoppingCart from './ShoppingCart';
import Tab from './Tab';
import Wishlist from './components/WishList';
import Reviews from './Reviews';

class App extends Component {

    render() {
        return (
            <HashRouter>
                <div>
                    <Header></Header>
                        <div id="route-container">
                            <Route path="/Search" component={SearchArea}/>
                            <Route path="/bookList/:term" component={BookList}/>
                            <Route path="/HomePage" component={HomePage}/>
                            <Route path="/Profile" component={Profile}/>
                            <Route path="/ShoppingCart" component={ShoppingCart}/>
                            <Route path="/BookDetails" component={Tab}/>
                            <Route path="/Wishlist" component={Wishlist}/>
                            <Route path="/Reviews" component={Reviews}/>
                        </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;