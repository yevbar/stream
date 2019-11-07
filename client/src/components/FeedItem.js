import React from 'react';
import { isTweet } from '../utils';

import Tweet from './Tweet';
import HackerNewsItem from './HackerNewsItem';

const FeedItem = ({ item }) => {
  if (isTweet(item)) {
    return (
      <Tweet tweet={item} />
    )
  }

  return (
    <HackerNewsItem hn={item} />
  );
}

export default FeedItem;
