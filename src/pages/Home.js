import React from 'react';
import { Link } from 'react-router-dom';

function Home({ posts }) {
  return (
    <div>
      <h2>All Events</h2>
      {posts.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          justifyContent: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {posts.map((post) => (
            <div key={post.id} className="post-card" style={{
              border: '1px solid #ccc',
              padding: '1em',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}>
              <h3>{post.title}</h3>
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: '100%', height: 'auto', maxHeight: 200, objectFit: 'cover' }}
                />
              )}
              <p><em>By {post.author || 'Guest'} on {new Date(post.date).toLocaleDateString()}</em></p>
              <p>{post.content.slice(0, 100)}...</p>
              <Link to={`/post/${post.id}`}>Read More</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
