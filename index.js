const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const Twitter = require('twitter');

const app = express();
let db = null;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Success'
  });
});

const getHackerNewsPosts = async () => {
  return axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
    .then(({ data }) => {
      return Promise.all(data.map(post => axios.get(`https://hacker-news.firebaseio.com/v0/item/${post}.json`).then(({ data }) => data)))
    })
    .catch(err => console.log(`Error: ${err}`));
}

const initializeHackerNewsPosts = async () => {
  db.collection('hn').find().toArray((err, results) => {
    // TODO - Add additional check for refilling hacker news posts
    // ^ based on last time refilled?

    if (results.length === 0 ) {
      getHackerNewsPosts()
        .then(hn => {
          db.collection('hn').insertMany(hn, (err, results) => {
            if (err) {
              return { error: err }
            }
            
            return hn;
          });
        });
    }
  });
}

const getTweets = async () => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  return client.get('statuses/home_timeline', {})
}

const initializeTweets = async () => {
  db.collection('tweets').find().toArray((err, results) => {
    if (results.length === 0) {
      getTweets()
        .then(tweets => {
          console.log('we got dem tweets');
          db.collection('tweets').insertMany(tweets, (err, results) => {
            if (err) {
              return { error: err }
            }
            
            return tweets;
          });
        });
    }
  });
}

app.get('/api/hn', async (req, res) => {
  db.collection('hn').find().toArray((err, results) => {
    if (err) {
      res.json({
        error: err
      });
    }

    res.json(results);
  });
});

app.get('/api/twitter', async (req, res) => {
  db.collection('tweets').find().toArray((err, results) => {
    if (err) {
      res.json({
        error: err
      });
    }

    res.json(results);
  });
});

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
MongoClient.connect(MONGO_URI, async (err, client) => {
  db = client.db('myDatabase');

  console.log("Getting hacker news posts");
  await initializeHackerNewsPosts();
  console.log("Successfully retrieved hacker news posts");

  console.log('Getting tweets')
  await initializeTweets();
  console.log("Successfully got tweets");

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`We're listening on port: ${port}`));
});
