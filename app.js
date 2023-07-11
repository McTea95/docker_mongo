const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
require('dotenv').config();


// MongoDB-Verbindungs-URL
const url = 'mongodb://mongodb:27017'; //wichtig


// MongoDB-Datenbankname und Sammlungsname
const dbName = process.env.MONGO_DATABASE.toString();
const collectionName = process.env.MONGO_COLLECTION.toString();

// Erstelle eine Express-App
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/test', async (req, res) => {
  res.send('test')
})

// Endpunkt zum Abfragen aller Datensätze
app.get('/', async (req, res) => {
  try {
    // Verbindung zur MongoDB herstellen
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Alle Dokumente in der Sammlung abfragen
    const laender = await collection.find({}).toArray();

    // Antwort senden
    res.render('index', { laender });
    //res.send(laender);

    // Verbindung zur MongoDB schließen
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
});


// Server starten
app.listen(port, () => {
  console.log('Server gestartet und hört auf Port 3000');
});
