import styles from "./PostDetail.module.css";

import React from "react";

import { Link } from "react-router-dom";

const PostDetail = ({post})=>{

    return(
        <div className={styles.post_detail}>

            <p className={styles.createdby}>by: {post.createdBy}</p>
            <img src={post.image} alt={post.title} />
            <div className={styles.img_div}>
            <h2>{post.title}</h2>
            <p> {new Date(post.createdAt.seconds * 1000).toLocaleString()} </p>
            <div className={styles.tags}>
                {post.tagsArray.map((tag)=>(
                    <p key={tag}><span>#</span>{tag}</p>
                ))}
            </div>
            <Link to={`/post/${post.id}`} className="btn btn-outline">Read</Link>
            </div>
        </div>
        
    )
}

export default PostDetail