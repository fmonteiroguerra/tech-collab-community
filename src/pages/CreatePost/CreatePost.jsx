import React, { useEffect } from 'react'
import styles from "./CreatePost.module.css";

import { useState } from "react"; //
import { useNavigate } from "react-router-dom"; //servirá para redirecionar página após post ser criado
import { useAuthValue } from "../../context/AuthContext";

import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("") //para erros de formulário

    const {user} = useAuthValue() //pq precisaremos do user id como parametro pra inserção do post

    const navigate = useNavigate()

    const {insertDocument, response} = useInsertDocument("posts")

    const handleSubmit = (e)=> {
        e.preventDefault();

        setFormError("") //zerar erros de formulario, necessario pra quando usuario tentou submeter formulario com algum erro, dessa forma quando tentar de nvo o erro seja limpado para ser verificado se tem erro no novo preenchimento

        //validar imagem url, basicamente é tentar criar um objeto URL com os dados de image, se não der configuramos um erro
        try {
            new URL(image) 
            
        } catch (error) {
            console.log("entrou url")
            setFormError("Image must be an URL.")
            return
        }

        //criar array de tags. 
       /*  1-formar um array para cada elemto separado por virgula, 
           2-fazer um map para percorrer cada elemento fazendo 
              trim() pra tirar espaços de cada elemeto, e também 
              transformar todos em lowercase */
        const tagsArray = tags.split(",").map((tag)=> tag.trim().toLowerCase())
        //validar todos os valores

        if(!title || !image || !tags || !body){
            setFormError("Please fill all the fields")
            return
        }

      //estando toudo validado, fazemos o post
        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid, //user ID
            createdBy: user.displayName
        });

        // redirect para home page, pois o post acabou de ser inserido
        navigate("/")
    }

  return (
    <div className={styles.create_post}>
        <h2>New Post</h2>
        <p>Share your tech content to the World</p>

        <form onSubmit={handleSubmit}>
            <label >
                <span>Title:</span>
                <input 
                    type="text" 
                    name='title'
                    required
                    placeholder='Think in a good title...'
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}                
                />
            </label>
            <label >
                <span>Image's URL </span>
                <input 
                    type="text" 
                    name='image'
                    required
                    placeholder='Insert url here'
                    onChange={(e)=>setImage(e.target.value)}
                    value={image}                
                />
            </label>
            <label >
                <span>Content </span>
                <textarea 
                    type="text" 
                    name='body'
                    required
                    placeholder='Write content here'
                    onChange={(e)=>setBody(e.target.value)}
                    value={body}                
                />
            </label>
            <label >
                <span>Tags </span>
                <input 
                    type="text" 
                    name='tags'
                    required
                    placeholder='Insert tags separeted by commas'
                    onChange={(e)=>setTags(e.target.value)}
                    value={tags}                
                />
            </label>
            
            {!response.loading ? <button className='btn'>Publish</button> : <button className='btn' disabled>Wait...</button> }
             {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p> }

        </form>
    </div>
  )
}

export default CreatePost