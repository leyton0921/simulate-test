// src/interfaces/like.interfaces.ts

export interface LikeRequest {
    id: string,
    quantity: number,
    post_id:number
}
  
export interface LikeResponse {
    message: string;
    likes: Array<{
      quantity: number;
      post_id: number;
      id?: number; 
    }>;
  }
  
  