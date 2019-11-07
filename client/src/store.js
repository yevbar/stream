import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { FETCH_HACKER_NEWS_PENDING, FETCH_HACKER_NEWS_SUCCESS, FETCH_HACKER_NEWS_FAILURE, FETCH_TWITTER_PENDING, FETCH_TWITTER_SUCCESS, FETCH_TWITTER_FAILURE, FETCH_LOBSTERS_PENDING, FETCH_LOBSTERS_SUCCESS, FETCH_LOBSTERS_FAILURE } from './actions';

const initialState = {
  hackerNewsPending: false,
  hackerNewsPosts: [],
  hackerNewsError: null,
  tweetsPending: false,
  tweets: [],
  tweetsError: null,
  lobstersPending: false,
  lobstersPosts: [],
  lobstersError: null
}

function reducer (state = initialState, action) {
  switch(action.type) {
    case FETCH_HACKER_NEWS_PENDING:
      return {
        ...state,
        hackerNewsPending: true
      }
    case FETCH_HACKER_NEWS_SUCCESS:
      return {
        ...state,
        hackerNewsPending: false,
        hackerNewsPosts: action.payload
      }
    case FETCH_HACKER_NEWS_FAILURE:
      return {
        ...state,
        hackerNewsPending: false,
        hackerNewsError: action.error
      }
    case FETCH_TWITTER_PENDING:
      return {
        ...state,
        tweetsPending: true
      }
    case FETCH_TWITTER_SUCCESS:
      return {
        ...state,
        tweetsPending: false,
        tweets: action.payload
      }
    case FETCH_TWITTER_FAILURE:
      return {
        ...state,
        tweetsPending: false,
        tweetsError: action.error
      }
    case FETCH_LOBSTERS_PENDING:
      return {
        ...state,
        lobstersPending: true
      }
    case FETCH_LOBSTERS_SUCCESS:
      return {
        ...state,
        lobstersPending: false,
        lobstersPosts: action.payload
      }
    case FETCH_LOBSTERS_FAILURE:
      return {
        ...state,
        lobstersPending: false,
        lobstersError: action.err
      }
    default:
      return state;
  }
}

export const getHackerNewsPosts = state => state.hackerNewsPosts;
export const getHackerNewsPending = state => state.hackerNewsPending;
export const getHackerNewsError = state => state.hackerNewsError;
export const getTweets = state => state.tweets;
export const getTweetsPending = state => state.tweetsPending;
export const getTweetsError = state => state.tweetsError;
export const getLobstersPosts = state => state.lobstersPosts;
export const getLobstersPending = state => state.lobstersPending;
export const getLobstersError = state => state.lobstersError;

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
