'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPosts, deletePost, Post } from './services/api';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <Link href="/create" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Create Post</Link>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2">
            {post.title}
            <Link href={`/edit/${post.id}`} className="ml-2 text-blue-500">Edit</Link>
            <button onClick={() => handleDelete(post.id)} className="ml-2 text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}