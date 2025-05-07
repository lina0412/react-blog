import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import PostDetails from './pages/PostDetails';
import EditPost from './pages/EditPost';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Failed to load posts', err));
  }, []);

  const deletePost = (id) => {
    fetch(`http://localhost:5000/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setPosts(prev => prev.filter(post => post.id !== Number(id)));
      })
      .catch(err => console.error('Failed to delete post', err));
  };

  const addPost = (newPost) => {
    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then(res => res.json())
      .then(addedPost => {
        setPosts(prev => [addedPost, ...prev]);
      })
      .catch(err => console.error('Failed to add post', err));
  };

  const editPost = (updatedPost) => {
    fetch(`http://localhost:5000/posts/${updatedPost.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
      .then(() => {
        setPosts(prev =>
          prev.map(post => (post.id === updatedPost.id ? updatedPost : post))
        );
      })
      .catch(err => console.error('Failed to edit post', err));
  };

  return (
    <Router>
      <div className="container">
        <h1>📝 React Blog</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/new">New Post</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/" element={<Home posts={posts} />} />
          <Route path="/new" element={<NewPost addPost={addPost} />} />
          <Route path="/post/:id" element={<PostDetails deletePost={deletePost} />} />
          <Route path="/edit/:id" element={<EditPost posts={posts} editPost={editPost} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
