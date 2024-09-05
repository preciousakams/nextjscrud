const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
};

export const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
};

export const deletePost = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete post');
};