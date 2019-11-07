export const getJson = (url) => {
  return fetch(url).then(response => response.json())
}

export const getApiUrl = () => {
  // Our express application is listening on port 3000
  return (process.env.NODE_ENV === "development") ? `http://localhost:3000/api` : `/api`;
}

export const isTweet = (item) => {
  return item.hasOwnProperty('retweeted_status') || item.hasOwnProperty('retweet_count')
}

export const getText = (item) => {
  if (isTweet(item)) {
    return item.text
  }

  return item.title
}
