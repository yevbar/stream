import React from 'react';

import HackerNewsProgressIcon from './HackerNewsProgressIcon';
import TwitterProgressIcon from './TwitterProgressIcon';

function Header() {
  return (
    <div id="header">
      <HackerNewsProgressIcon/>
      <TwitterProgressIcon/>
    </div>
  );
}

export default Header;
