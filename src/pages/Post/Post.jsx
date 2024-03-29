import React from 'react'
import styles from "./Post.module.css";

//hooks
import { useParams } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import PostDetail from '../../components/PostDetail/PostDetail';

const Post = () => {
  const { id } = useParams();
  const { documents: post } = useFetchDocuments("posts", null, null , id)

  return (
    <div>
      {post &&
      
      <div className={styles.post_container}>
        <h1>{post.title}</h1>
        <p>by: {post.createdBy}</p>
        <p> {new Date(post.createdAt.seconds * 1000).toLocaleString()} </p>
        <img src={post.image} alt={post.title} />
        <p className={styles.body}>{post.body}</p>
        <div className={styles.tags}>
          {post.tagsArray.map((tag)=>(
            <p key={tag}><strong>#</strong>{tag}</p>
          ))}
        </div>
        
      </div>
      }
      
    </div>
  )
}

export default Post