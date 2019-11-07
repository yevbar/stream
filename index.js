const axios = require('axios');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
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
    if (err) {
      console.log(`Error: ${err}`);
      throw err;
    }

    if (results.length === 0 ) {
      getHackerNewsPosts()
        .then(hn => {
          db.collection('hn').insertMany(hn, (err, results) => {
            if (err) {
              throw err
            }
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
          db.collection('tweets').insertMany(tweets, (err, results) => {
            if (err) {
              throw err
            }
          });
        });
    }
  });
}

const getLobsters = async () => {
  return axios.get('https://lobste.rs')
    .then(({ data }) => {
      const $ = cheerio.load(data);
      let postList = [];
      $('li > div > div.details > span > a').each((i, elem) => {
        let url = $(elem).attr('href');
        url = (url.substring(0,4) === 'http') ? url : `https://lobste.rs${url}`;
        const title = $(elem).text();

        postList[i] = {
          title: title,
          url: url,
          // So we can filter on frontend
          lobsters: true
      }});
      postList = postList.filter(post => post != undefined && post.title.indexOf(' ') !== -1);
      return postList;
    });
}

const initializeLobsters = async () => {
  db.collection('lobsters').find().toArray((err, results) => {
    if (results.length === 0) {
      getLobsters()
        .then(posts => {
          db.collection('lobsters').insertMany(posts, (err, results) => {
            if (err) {
              throw err;
            }
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

app.get('/api/lobsters', async (req, res) => {
  db.collection('lobsters').find().toArray((err, results) => {
    if (err) {
      res.json({
        error: err
      });
    }

    res.json(results);
  });
});

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
const MONGO_DB = process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(process.env.MONGODB_URI.lastIndexOf('/')+1) : 'myDatabase';
MongoClient.connect(MONGO_URI, async (err, client) => {
  console.log(`Connected to mongo instance at ${MONGO_URI}`);
  console.log(`Connecting to database: ${MONGO_DB}`);
  db = client.db(MONGO_DB);

  console.log("Getting hacker news posts");
  await initializeHackerNewsPosts();
  console.log("Successfully retrieved hacker news posts");

  console.log('Getting tweets')
  await initializeTweets();
  console.log("Successfully retrieved tweets");

  console.log('Getting lobsters');
  await initializeLobsters();
  console.log('Successfully retrieved lobsters posts');

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`We're listening on port: ${port}`));
});
