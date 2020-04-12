import React, {Component} from 'react';
import Header from './Header'
import {Route, HashRouter} from "react-router-dom";
import SearchArea from './SearchArea';
import BookList from './BookList';
import HomePage from './HomePage';
import Profile from './Profile';
import Register from './components/profilemanagement/CreateAccountForm';
import ShoppingCart from './ShoppingCart';
import BookDetails from './BookDetails';
import Wishlist from './components/WishList';
import Reviews from './Reviews';

class App extends Component {
    render() {
        // const bookid = 1;
        return (
            <HashRouter>
                <div>
                    <Header></Header>
                        <div id="route-container">
                            <Route path="/Search" component={SearchArea}/>
                            <Route path="/bookList/:term" component={BookList}/>
                            <Route path="/HomePage" component={HomePage}/>
                            <Route path="/Profile" component={Profile}/>
                            <Route path="/Register" component={Register}/>
                            <Route path="/ShoppingCart" component={ShoppingCart}/>
                            {/* <Route path="/BookDetails" render={bookid => (<BookDetails {bookid}/>)}> */}
                            <Route path="/BookDetails" component= {BookDetails}/>
                            <Route path="/Wishlist" component={Wishlist}/>
                            <Route path="/Reviews" component={Reviews}/>
                        </div>
                </div>
            </HashRouter>

        );
    }
}

export default App;