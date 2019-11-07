import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getHackerNews } from '../actions';
import { getHackerNewsPosts, getHackerNewsPending, getHackerNewsError, getTweets, getTweetsPending, getTweetsError } from '../store';
import { fetchHackerNews } from '../fetchHackerNews';
import { fetchTwitter } from '../fetchTweets';
import FeedItem from './FeedItem';
import { getText } from '../utils';

class Content extends Component {
  constructor(props) {
    super(props);
    const { fetchHackerNews, fetchTweets, pending, posts } = this.props;

    // If there are no posts and nothing's pending
    if (posts.length === 0 && !pending) {
      fetchHackerNews();
      fetchTweets();
    }

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  shouldComponentRender() {
    const { pending } = this.props;

    if (pending === false) {
      return false;
    }

    return true;
  }

  render () {
    const { pending, posts, error } = this.props;

    if(!this.shouldComponentRender) {
      return (
        <h1>Loading</h1>
      );
    }

    return (
      <ul>
        {error && <span>{error}</span>}
        {posts.map((post, index) => (
          <li key={index}>
            <FeedItem item={post} />
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => ({
  pending: getHackerNewsPending(state) && getTweetsPending(state),
  posts: [...getHackerNewsPosts(state), ...getTweets(state)],
  error: getHackerNewsError(state) || getTweetsError(state) || null
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchHackerNews: fetchHackerNews,
  fetchTweets: fetchTwitter
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Content);
