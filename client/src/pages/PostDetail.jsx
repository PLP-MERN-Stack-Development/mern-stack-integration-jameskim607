import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { postService } from '../services/api'

export default function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    postService.getPost(id).then((data) => setPost(data))
  }, [id])

  if (!post) return <div>Loading...</div>

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div>Views: {post.viewCount}</div>
    </article>
  )
}
