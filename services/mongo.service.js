const MongoClient = require('mongodb').MongoClient;

module.exports = {
    getCollection,
};

// Database Name
const dbName = process.env.DB_NAME;

var dbConn = null;

async function getCollection(collectionName) {
    try {
        const db = await _connect();
        const collection = await db.collection(collectionName);
        return collection;
    } catch (err) {
        console.error('Failed to get Mongo collection', err);
        throw err;
    }
}

async function _connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.error('Cannot Connect to DB', err);
        throw err;
    }
}
