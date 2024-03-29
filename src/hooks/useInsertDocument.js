import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import {collection, addDoc, Timestamp} from 'firebase/firestore'
//no firebase :
// colection é como se fossem tabela, 
//addDoc é a função que faz insert do documento no banco.
//Timestamp: marca o horário em que foi regitado o dado


const initialState = {
    loading: null,
    error: null
}

//função que será executada ao usar reducer
const insertReducer = (state,action)=>{
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null}            
        case "INSERTED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export const useInsertDocument = (docCollection)  => { // ex. de docCollection: "posts"
    const [response, dispatch] = useReducer(insertReducer, initialState)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action)=>{
        if(!cancelled){
            dispatch(action)
        }
    }

    const insertDocument = async (document) => {
        checkCancelBeforeDispatch({ type: "LOADING" });
        //neste momento,  armazenei a infomrsão no response de que o loading é true e pra ja nao ha erros (antes de armazenar esta info no response eu verifiquei se o cancelled nao estava true)

        try {
            console.log("entrou no try")
            console.log("document")
            const newDocument = {...document, createdAt: Timestamp.now()}

            const insertedDocument = await addDoc(
                collection(db, docCollection), 
                //o método collection será em qual coleção/tabela eu vou querer inserir o documento,
                // assim fica obvio que vou precisar como argumento a identificação da DB e o NOME DA COLLECTION
                newDocument
            )


            //se ele concluir a inserção , eu vou inserir o valor do response como loading: false error: null, validando antes se o cancelled é false
        checkCancelBeforeDispatch({
            type: "INSERTED_DOC",
            payload: insertedDocument
        })

        } catch (error) {
            checkCancelBeforeDispatch({type: "ERROR", payload: error.message})
            //se houver err na inserção, eu inserirei o valor de response como laoding: false, error: "mensagem de erro que veior"
        }
        useEffect(()=>{
            return () => setCancelled(true)
        }, []);
    }
    return {insertDocument , response}
}