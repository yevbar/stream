import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getHackerNews } from '../actions';
import { getHackerNewsPosts, getHackerNewsPending, getHackerNewsError, getTweets, getTweetsPending, getTweetsError, getLobstersPosts, getLobstersPending, getLobstersError } from '../store';
import { fetchHackerNews } from '../fetchHackerNews';
import { fetchTwitter } from '../fetchTweets';
import { fetchLobsters } from '../fetchLobsters';
import FeedItem from './FeedItem';
import { getText } from '../utils';

class Content extends Component {
  constructor(props) {
    super(props);
    const { fetchHackerNews, fetchTweets, fetchLobsters, pending, posts } = this.props;

    // If there are no posts and nothing's pending
    if (posts.length === 0 && !pending) {
      fetchHackerNews();
      fetchTweets();
      fetchLobsters();
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
  pending: getHackerNewsPending(state) && getTweetsPending(state) && getLobstersPending(state),
  posts: [...getTweets(state), ...getLobstersPosts(state), ...getHackerNewsPosts(state)],
  error: getHackerNewsError(state) || getTweetsError(state) || getLobstersError(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchHackerNews: fetchHackerNews,
  fetchTweets: fetchTwitter,
  fetchLobsters: fetchLobsters,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Content);
