import React from 'react';
import { isTweet, isLobsters } from '../utils';

import Tweet from './Tweet';
import HackerNewsItem from './HackerNewsItem';
import Lobsters from './Lobsters';

const FeedItem = ({ item }) => {
  if (isTweet(item)) {
    return (
      <Tweet tweet={item} />
    )
  } else if (isLobsters(item)) {
    return (
      <Lobsters post={item} />
    );
  }

  return (
    <HackerNewsItem hn={item} />
  );
}

export default FeedItem;
