'use strict'
module.exports = {
    name: 'rest-api',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
        uri: 'mongodb+srv://edgarb:mongodb@personallearning-4harg.mongodb.net/test?retryWrites=true&w=majority',
    }
}