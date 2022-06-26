import React from "react";

function AppHeader({ _currentAccount }) {
  return (
    <header className="App-header">
      <h1>DeBlock</h1>
      <ul className="header-data">
        <li>Address: {_currentAccount}</li>
        <li>TotalPostsNumber</li>
        <li>TotalPostPage</li>
      </ul>
    </header>
  );
}

export default AppHeader;
