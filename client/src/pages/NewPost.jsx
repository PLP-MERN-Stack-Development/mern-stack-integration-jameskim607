import React, { useState } from 'react'
import { postService } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    const data = await postService.createPost({ title, content })
    navigate(`/posts/${data._id}`)
  }

  return (
    <div>
      <h1>New Post</h1>
      <form onSubmit={submit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
