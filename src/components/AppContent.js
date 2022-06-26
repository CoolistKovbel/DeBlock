import React, { useState } from "react";

function AppContent({ _currentAccount, _addPost, _allPosts, _counter }) {
  const [post, setPost] = useState("");

  const onChange = (e) => {
    let message = e.target.value;

    setPost(message);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    _addPost(post);
    setPost("");
  };

  return (
    <main className="App-content">
      <section id="profile">
        <div className="dashboard-container">
          <h2>Profile</h2>
          <div className="profile-card">
            <div className="profile-img-container">
              <img
                src="https://imgs.search.brave.com/oEvKH2FL9QQoZOPAfMrNfPzVJhJVsAfrlvejBRshL4A/rs:fit:1080:720:1/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/NDUwNjI5OTAtNGE5/NWU4ZTRiOTZkP2l4/bGliPXJiLTEuMi4x/JnE9ODAmZm09anBn/JmNyb3A9ZW50cm9w/eSZjcz10aW55c3Jn/YiZ3PTEwODAmZml0/PW1heA"
                alt="profile image"
              />
            </div>
            <h3>Address: {_currentAccount}</h3>
          </div>
        </div>
      </section>

      <section id="post-center">
        <div className="dashboard-container">
          <h2>Posts</h2>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="enter message"
              onChange={onChange}
              value={post}
            />
            <button>Submit</button>
          </form>

          {_counter ? (
            <div className="posts">
              {_allPosts.map((post) => {
                return (
                  <div key={post._id.toString()} className="post">
                    <h3>Address: {post._person}</h3>
                    <p>{post._message}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Loading post...</p>
          )}
        </div>
      </section>

      <section id="trending">
        <div className="dashboard-container">
          <h2>Trending</h2>
          <div>
            <h3>Top Poster</h3>
            <ul>
              <li>
                <p>
                  <b>#1</b>
                </p>
                <p>AddressOne</p>
                <p>Total Posts</p>
              </li>
              <li>
                <p>
                  <b>#2</b>
                </p>
                <p>AddressTwo</p>
                <p>Total Posts</p>
              </li>
              <li>
                <p>
                  <b>#3</b>
                </p>
                <p>AddressThree</p>
                <p>Total Posts</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AppContent;
