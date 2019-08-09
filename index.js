'use strict';

const port = 8010;
var cors  = require('cors');
var log = require('./config/winston');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

db.serialize(() => {
    buildSchemas(db);
    try{
        const app = require('./src/app')(db);
        app.use(cors());
        app.listen(port, () => console.log(`App started and listening on port ${port}`));
    }
    catch(e){
        log.error(e);
    }
});