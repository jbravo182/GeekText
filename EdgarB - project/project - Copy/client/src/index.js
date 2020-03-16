import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
*   Module Dependencies
*/
/*
const config = require('./config'),
      mongodb = require('mongodb').MongoClient

//establish a connection to mongodb atlas
mongodb.connect(config.db.uri, (err, db) => {

    if(err) {
        console.log('an error has occured while attempting to connect to MongoDB', err);
        process.exit(1);
    }


    console.log('connection sucessful');

})
*/
