"use client";

import React, { useEffect, useState } from 'react';
import { getAllPosts, createPost, updatePost, deletePost } from '../controllers/post.controllers';
import { Datum, BodyRequestCreatePost, BodyrequestUpdatePost } from '../interface/post';
import PostCard from './PostCard';
import  Style from '../styles/post.module.css';
import Input from './input';


const PostForm: React.FC = () => {
  const [posts, setPosts] = useState<Datum[]>([]);
  const [selectedPost, setSelectedPost] = useState<Datum | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<BodyRequestCreatePost>({
    title: '',
    description: '',
    user_id: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAllPosts();
      if (result) {
        setPosts(result.posts);
      } else {
        setError('Failed to load posts');
      }
    } catch (err) {
      setError('An error occurred while fetching posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await createPost(formData);
      if (result) {
        setSuccess('Post created successfully');
        setFormData({
          title: '',
          description: '',
          user_id: ''
        });
        fetchPosts();
      } else {
        setError('Failed to create post');
      }
    } catch (err) {
      setError('An error occurred while creating the post');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedPost) {
      setError(null);
      setSuccess(null);
      setIsLoading(true);

      const updatedPostData: BodyrequestUpdatePost = {
        title: formData.title,
        description: formData.description,
        user_id: parseInt(formData.user_id)
      };

      try {
        const result = await updatePost(parseInt(selectedPost.id), updatedPostData);
        if (result) {
          setSuccess('Post updated successfully');
          setSelectedPost(null);
          setIsEditing(false);
          fetchPosts();
        } else {
          setError('Failed to update post');
        }
      } catch (err) {
        setError('An error occurred while updating the post');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeletePost = async (id: string) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await deletePost(id);
      if (result) {
        setSuccess('Post deleted successfully');
        fetchPosts();
      } else {
        setError('Failed to delete post');
      }
    } catch (err) {
      setError('An error occurred while deleting the post');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPost = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setSelectedPost(post);
      setFormData({
        title: post.title,
        description: post.description,
        user_id: post.user_id
      });
      setIsEditing(true);
    } else {
      setError('Post not found');
    }
  };

  return (
 <div className="form-container">
      <form onSubmit={isEditing ? handleEditPost : handleCreatePost} className="form-post">
        <h2 className="form-header">{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <Input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Ingrese el título del post"
            label="Title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            className="form-textarea"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="user_id" className="form-label">User ID:</label>
          <input
            type="text"
            className="form-control"
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Processing...' : (isEditing ? 'Update Post' : 'Create Post')}
        </button>
        {isEditing && (
          <button type="button" className="btn-secondary ml-2" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </form>
    

      {/* List of posts */}
      <h2>All Posts</h2>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : Array.isArray(posts) && posts.length === 0 ? ( // Check if posts is an array
        <p>No posts available</p>
      ) : (
        <div className={Style.containerposts}>
          {Array.isArray(posts) && posts.map((post) => ( // Check if posts is an array before mapping
               
              <PostCard
                post={post}
                onEdit={handleSelectPost}
                onDelete={handleDeletePost}
              />
           
          ))}
        </div>
      )}
    </div>
  );
};

export default PostForm;
