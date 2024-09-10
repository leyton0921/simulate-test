import React, { useState, useEffect } from 'react';
import { Datum } from '../interface/post';
import { addLike, getLikesForPost } from '../controllers/like.controllers';
import styles from '../styles/post.module.css'; // Importa los estilos

const PostCard: React.FC<{
  post: Datum;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ post, onEdit, onDelete }) => {
  const [likes, setLikes] = useState<number>(0); // Número inicial de "likes"
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Obtener el número inicial de "likes" cuando el componente se monta
  useEffect(() => {
    const fetchLikes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getLikesForPost(post.id);
        const initialLikes = response.likes.length > 0 ? response.likes[0].quantity : 0;
        setLikes(initialLikes);
      } catch (err) {
        console.error('Failed to fetch initial likes:', err);
        setError('Failed to fetch likes');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikes();
  }, [post.id]);

  const handleLike = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await addLike({
        quantity: likes + 1,
        post_id: Number(post.id),
        id: '', // Si no usas el ID del usuario, elimínalo o ajusta según tu lógica
      });

      const updatedLikes = response && response.likes && response.likes.length > 0
        ? response.likes[0].quantity
        : likes + 1;

      setLikes(updatedLikes);
    } catch (err) {
      console.error('Failed to add like:', err);
      setError('Failed to add like');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <figure className={styles.card}>
      <h2 className={styles.cardTitle}>{post.title}</h2>
      <h4 className={styles.author}>Author: </h4> {/* Placeholder for author */}
      <figcaption className={styles.figcaption}>
        <h5 className={styles.description}>{post.description}</h5>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            className={`${styles.button} ${styles.editButton}`}
            type="button"
            onClick={() => onEdit(post.id)}
          >
            Edit
          </button>
          <button
            className={`${styles.button} ${styles.deleteButton}`}
            type="button"
            onClick={() => onDelete(post.id)}
          >
            Delete
          </button>
          <button
            className={`${styles.button} ${styles.likeButton}`}
            type="button"
            onClick={handleLike}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : `👍 (${likes})`}
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>} {/* Mostrar mensaje de error si existe */}
      </figcaption>
    </figure>
   
  );
};

export default PostCard;
