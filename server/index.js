import SourceMapSupport from 'source-map-support';

SourceMapSupport.install();
import 'babel-polyfill';
import http from 'http';

import { MongoClient } from 'mongodb';

let appModule = require('./server.js');
let db;
let server;

MongoClient.connect('mongodb://localhost/SAMP').then(connection => {
    db = connection;
    console.log('db: ' + db);

    db.collection('activities').find().count().then((count) => {
        console.log('Activities retrieved: ' + count);
        // db.close();
    });
    db.collection('activities').find({status: 'pending'}).count().then((count) => {
        console.log('Total pending activities: ' + count);
        // db.close();
    });
    server = http.createServer();
    appModule.setDb(db);
    server.on('request', appModule.app);
    server.listen(3000, () => {
        console.log('App started on port 3000');
    });
}).catch(error => {
    console.log('ERROR', error);
});

if(module.hot) {
    module.hot.accept('./server.js', () => {
        server.removeListener('request', appModule.app);
        appModule = require('./server.js');
        appModule.setDb(db);
        server.on('request', appModule.app);
    });
}