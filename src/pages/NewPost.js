import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewPost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Please fill out both title and content.");
      return;
    }

    const newPost = {
      title,
      content,
      image,
      author: "Guest",
      date: new Date().toISOString().split('T')[0], // 'YYYY-MM-DD'
    };

    fetch('http://localhost:5000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to create post');
        return res.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to create post');
      });
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Image URL:</label><br />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label><br />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            required
          />
        </div>
        <button type="submit">Publish Event</button>
      </form>
    </div>
  );
}

export default NewPost;
