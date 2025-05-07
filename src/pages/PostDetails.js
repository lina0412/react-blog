import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function PostDetails({ deletePost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deletePost(id);
      navigate('/');
    }
  };

  const handleRegister = () => {
    alert("You've registered for this event!");
  };

  if (loading) return <p>Loading...</p>;
  if (!post) return <h2>Event Not Found</h2>;

  return (
    <div style={{ textAlign: 'center', padding: '1em' }}>
      <h2>{post.title}</h2>
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          style={{
            width: "100%",
            maxWidth: 500,
            height: 'auto',
            marginBottom: '1em',
            borderRadius: '8px'
          }}
        />
      )}
      <p><em>By {post.author || "Guest"} on {new Date(post.date).toLocaleDateString()}</em></p>
      <p style={{ maxWidth: '700px', margin: '0 auto' }}>{post.content}</p>
      <div style={{ marginTop: '1.5em' }}>
        <button onClick={handleRegister}>Register</button>
        <button onClick={() => navigate(`/edit/${post.id}`)} style={{ marginLeft: '1em' }}>Edit</button>
        <button onClick={handleDelete} style={{ marginLeft: '1em', color: 'red' }}>Delete</button>
      </div>
      <br /><br />
      <Link to="/">← Back to Events</Link>
    </div>
  );
}

export default PostDetails;
