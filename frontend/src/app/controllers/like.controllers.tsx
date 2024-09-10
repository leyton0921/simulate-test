// src/controllers/like.controllers.ts

import { LikeRequest, LikeResponse } from '../interface/likes';

const BASE_URL = 'http://localhost:3060/api/likes';

// Función para añadir un "like" a un post
export const addLike = async (likeRequest: LikeRequest): Promise<LikeResponse> => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likeRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data from addLike:', data); // Añade este log para depuración
    return data;
  } catch (error) {
    console.error('Error adding like:', error);
    throw error;
  }
};

export const getLikesForPost = async (postId: string): Promise<LikeResponse> => {
  try {
    console.log(`Fetching likes for post ID: ${postId}`);
    
    const response = await fetch(`${BASE_URL}?post_id=${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`Response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching likes for post:', error);
    throw error;
  }
};


