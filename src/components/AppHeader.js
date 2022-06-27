import React from "react";

function AppHeader({
  _currentAccount,
  _totalNumberOfPosts,
  _singleTotalPosts,
}) {
  return (
    <header className="App-header">
      <h1>DeBlock</h1>
      <ul className="header-data">
        <li>Address: {_currentAccount}</li>
        <li>Total Contract Posts:{_totalNumberOfPosts}</li>
        <li>Total Posts: {!_singleTotalPosts ? "0" : _singleTotalPosts}</li>
      </ul>
    </header>
  );
}

export default AppHeader;
