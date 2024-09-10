
import { IBodyResponseGetAllPosts, BodyRequestCreatePost, BodyResponseCreatePost, BodyResponseUpdatePost, BodyResponseDeletePost, BodyrequestUpdatePost, Datum } from '../interface/post';
import { BASE_API_URL } from '../utils/constants';

const BASE_URL = 'http://localhost:3060/api/posts';


export const getAllPosts = async (): Promise<IBodyResponseGetAllPosts | null> => {
  try {
    const response = await fetch(`${BASE_API_URL}/posts`, { method: 'GET' });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: IBodyResponseGetAllPosts = await response.json();
    return data; 
} catch (error) {
    console.error('Error fetching posts:', error);
    return null;
}
};

  export const createPost = async (post: BodyRequestCreatePost): Promise<BodyResponseCreatePost | null> => {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseCreatePost = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      return null;
    }
  };
  export const updatePost = async (id: number, post: BodyrequestUpdatePost): Promise<BodyResponseUpdatePost | null> => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseUpdatePost = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating post:', error);
      return null;
    }
  };
  export const deletePost = async (id: string): Promise<BodyResponseDeletePost | null> => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data: BodyResponseDeletePost = await response.json();
      return data;
    } catch (error) {
      console.error('Error deleting post:', error);
      return null;
    }
  };