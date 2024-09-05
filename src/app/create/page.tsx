'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '../services/api';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost({ title, body, userId: 1 });
      router.push('/');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create</button>
      </form>
    </div>
  );
}