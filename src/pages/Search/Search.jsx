import React from "react";

import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import PostDetail from "../../components/PostDetail/PostDetail";
import { Link } from "react-router-dom";

import styles from "../Home/Home.module.css";

const Search = () => {
  const query = useQuery();
  const search = query.get("q"); // !! este método get remete ao useSearchParams declarado no hook useQuery. Como argumento ele recebe qual key da url eu quero pegar o valor

  const { documents: posts } = useFetchDocuments("posts", search);

  /*   return (
    <div className={styles.home}>
      <h2>Search Results:</h2>
      <div className={styles.posts}>
        {posts ? (
          posts.map((post) => <PostDetail key={post.id} post={post} />)
        ) : 
          <div className={styles.noposts}>
            <p>No posts found in your Search</p>
            <Link to="/" className="btn btn-dark">
              Return to HomePage
            </Link>
          </div>
        }
      </div>
    </div>
  );
}; */

  return (
    <div className={styles.home}>
      <h2>Search Results:</h2>
      <div className={styles.posts}>
        {posts && posts.length === 0 && (
          <>
            <p>No posts found in your Search</p>
            <Link to="/" className="btn btn-dark">
              Return to HomePage
            </Link>
          </>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
