import React from "react";
import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

//hooks
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: myposts, loading } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  //posts do usuario

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {loading && <p>Loading...</p>}
      {myposts && (
        <div className={styles.post_header}>
          <span>My Posts</span>
        </div>
      )}
      {myposts &&
        myposts.map((post) => (
          <div className={styles.post_row} key={post.id}>
            <h4>{post.title}</h4>
            <img src={post.image} alt={post.title} />
            <p className={styles.actions}>
              <Link to={`/posts/${post.id}`} className="btn btn-outline">
                Ver
              </Link>
              <Link to={`/posts/edit/${post.id}`} className="btn_alert">
                Editar
              </Link>
              <button
                onClick={() => deleteDocument(post.id)}
                className="btn_danger"
              >
                Excluir
              </button>
            </p>
          </div>
        ))}
      {myposts && myposts.length === 0 && (
        <div className={styles.noposts}>
          <p>No posts found</p>
          <Link to="/posts/create" className="btn">
            Create First Post
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
