import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost({ posts, editPost }) {
  const { id } = useParams();
  const postToEdit = posts.find(p => p.id === id);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
      setImage(postToEdit.image || '');
    }
  }, [postToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editPost({ ...postToEdit, title, content, image });
    navigate('/');
  };

  if (!postToEdit) return <h2>Event Not Found</h2>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Event</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Event title" />
      <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Event details..." />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditPost;
