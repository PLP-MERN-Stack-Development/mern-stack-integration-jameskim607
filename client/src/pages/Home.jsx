import React, { useEffect, useState } from 'react'
import { postService } from '../services/api'
import { Link } from 'react-router-dom'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    postService.getAllPosts().then((data) => setPosts(data.posts || data))
  }, [])

  return (
    <div>
      <h1>Recent Posts</h1>
      {posts.length === 0 && <p>No posts yet</p>}
      <ul>
        {posts.map((p) => (
          <li key={p._id}>
            <Link to={`/posts/${p._id}`}>{p.title}</Link>
            <div style={{ fontSize: 12, color: '#666' }}>{p.excerpt}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
