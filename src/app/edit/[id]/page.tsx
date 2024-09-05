'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPost, updatePost } from '../../services/api';

export default function EditPost({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const router = useRouter();
  const id = parseInt(params.id);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const post = await getPost(id);
      setTitle(post.title);
      setBody(post.body);
    } catch (error) {
      console.error('Failed to fetch post:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, body });
      router.push('/');
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
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
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}