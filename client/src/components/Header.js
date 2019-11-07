import React from 'react';

import HackerNewsProgressIcon from './HackerNewsProgressIcon';
import TwitterProgressIcon from './TwitterProgressIcon';
import LobstersProgressIcon from './LobstersProgressIcon';

function Header() {
  return (
    <div id="header">
      <HackerNewsProgressIcon/>
      <LobstersProgressIcon/>
      <TwitterProgressIcon/>
    </div>
  );
}

export default Header;
