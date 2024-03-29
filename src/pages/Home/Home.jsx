import React from 'react'
import styles from "./Home.module.css";

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useAuthValue } from "../../context/AuthContext";

//components
import PostDetail from '../../components/PostDetail/PostDetail';

const Home = () => {
    const [query, setQuery] = useState()
    const {documents: posts, loading} = useFetchDocuments("posts")
    const navigate = useNavigate()
    const { user } = useAuthValue();

    const handleSubmit = (e)=> {
        e.preventDefault()

        //quando for clicado no botao de submeter, se o query receber algum valor eu vou encaminhar pra uma pagina de resultados
        if (query){
            return navigate(`/search?q=${query}`)
            //usarei a url da pagina de resultados para transportar dados da busca
        }
    }

  return (
    <div className={styles.home}>
        
        <div className={styles.top}>
            
            {!user &&
            <Link className={styles.buttondiv} to="/register"><button className={styles.btn_registerhome}>Register Easily Here <br /><span>and begin to collab!</span></button></Link>
            }
        </div>

        <form onSubmit={handleSubmit} className={styles.search_form}>
            <input 
            type="text" 
            placeholder='Search for subject...' 
            onChange={(e)=>setQuery(e.target.value)}
            value={query}
            />
            <button className='btn btn-dark'>Search</button>
        </form>

        <h1>Latest posts</h1>
        <p>________</p>

        {/* Lista de Posts */}
        <div className={styles.posts}>
            {loading && <p>Loading...</p>}
            {posts && posts.map((post)=>(
                <>
            <PostDetail key={post.id} post={post} />
            
            </>
            )
            )}
            {posts && posts.length === 0 &&(
                <div className={styles.noposts}>
                    <p>No posts found</p>
                    <Link to="/posts/create" className='btn'>
                        Create First Post
                    </Link>
                </div>

            )}
        </div>
        
    </div>
  )
}



export default Home