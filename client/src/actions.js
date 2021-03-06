// Hacker News related actions

export const FETCH_HACKER_NEWS_PENDING = 'FETCH_HACKER_NEWS_PENDING';
export const FETCH_HACKER_NEWS_SUCCESS = 'FETCH_HACKER_NEWS_SUCCESS';
export const FETCH_HACKER_NEWS_FAILURE = 'FETCH_HACKER_NEWS_FAILURE';

export function fetchHackerNewsPending() {
  return {
    type: FETCH_HACKER_NEWS_PENDING
  }
}

export function fetchHackerNewsSuccess(posts) {
  return {
    type: FETCH_HACKER_NEWS_SUCCESS,
    payload: posts
  }
}

export function fetchHackerNewsFailure(error) {
  return {
    type: FETCH_HACKER_NEWS_FAILURE,
    error: error
  }
}

// Twitter related actions

export const FETCH_TWITTER_PENDING = 'FETCH_TWITTER_PENDING';
export const FETCH_TWITTER_SUCCESS = 'FETCH_TWITTER_SUCCESS';
export const FETCH_TWITTER_FAILURE = 'FETCH_TWITTER_FAILURE';

export function fetchTwitterPending() {
  return {
    type: FETCH_TWITTER_PENDING
  }
}

export function fetchTwitterSuccess(posts) {
  return {
    type: FETCH_TWITTER_SUCCESS,
    payload: posts
  }
}

export function fetchTwitterFailure(error) {
  return {
    type: FETCH_TWITTER_FAILURE,
    error: error
  }
}

// Lobsters related actions

export const FETCH_LOBSTERS_PENDING = 'FETCH_LOBSTERS_PENDING';
export const FETCH_LOBSTERS_SUCCESS = 'FETCH_LOBSTERS_SUCCESS';
export const FETCH_LOBSTERS_FAILURE = 'FETCH_LOBSTERS_FAILURE';

export function fetchLobstersPending() {
  return {
    type: FETCH_LOBSTERS_PENDING
  }
}

export function fetchLobstersSuccess(posts) {
  return {
    type: FETCH_LOBSTERS_SUCCESS,
    payload: posts
  }
}

export function fetchLobstersFailure(error) {
  return {
    type: FETCH_LOBSTERS_FAILURE,
    error: error
  }
}
