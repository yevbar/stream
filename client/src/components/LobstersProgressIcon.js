import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLobstersPosts, getLobstersPending, getLobstersError } from '../store';

class LobstersProgressIcon extends Component {
  render() {
    const { pending, posts, error } = this.props;

    // default
    let opacityValue = 'lobsters-loading-rendered';

    if (pending) {
      opacityValue = 'lobsters-loading-pending';
    } else if (posts.length > 0) {
      opacityValue = 'lobsters-loading-success';
    } else if (error) {
      opacityValue = 'lobsters-loading-error';
    }

    return (
      <div className={opacityValue}>
        <svg width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M14.889 23.652c-.923.227-1.888.348-2.881.348-6.627 0-12.008-5.377-12.008-12s5.381-12 12.008-12c6.628 0 12.009 5.377 12.009 12 0 1.027-.13 2.023-.373 2.975l-.965-.34c.21-.847.321-1.732.321-2.643 0-6.066-4.929-10.992-11-10.992s-11 4.926-11 10.992c0 6.067 4.929 10.993 11 10.993.887 0 1.751-.106 2.577-.304l.312.971zm-2.889-13.652c-1.104 0-2 .896-2 2s.896 2 2 2c.28 0 .546-.057.788-.162l3.06 9.525 2.174-3.622 4.116 4.259 1.879-1.828-4.087-4.216 3.671-1.926-9.694-3.426c.06-.19.093-.393.093-.604 0-1.104-.896-2-2-2zm1.768 3.615l7.333 2.597-2.823 1.481 4.324 4.461-.445.431-4.324-4.473-1.716 2.86-2.349-7.357zm.049 6.692c-.583.126-1.188.193-1.809.193-4.691 0-8.5-3.809-8.5-8.5s3.809-8.5 8.5-8.5c4.692 0 8.5 3.809 8.5 8.5 0 .619-.066 1.222-.192 1.803l-.959-.337c.094-.474.143-.964.143-1.466 0-4.139-3.361-7.5-7.5-7.5-4.139 0-7.5 3.361-7.5 7.5 0 4.139 3.361 7.5 7.5 7.5.517 0 1.022-.052 1.51-.152l.307.959zm-1.076-3.36c-.239.035-.484.053-.733.053-2.759 0-5-2.24-5-5s2.241-5 5-5c2.76 0 5 2.24 5 5 0 .212-.013.421-.039.626l-.979-.345.01-.281c0-2.208-1.792-4-4-4s-4 1.792-4 4 1.792 4 4 4l.43-.023.311.97zm-.741-5.947c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"/></svg>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pending: getLobstersPending(state),
  posts: getLobstersPosts(state),
  error: getLobstersError(state)
});

export default connect(mapStateToProps)(LobstersProgressIcon);
