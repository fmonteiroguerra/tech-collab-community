import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {useState, useEffect} from 'react'

export const useAuthentication = ()=>{
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleanup - necssário devido a muitas mudanças de componentes e páginas, isso serve para nao deixar resquicios de funções sendo executados, então fazemos o cleanup para não dar problema memory leak
    const [cancelled, setCancelled] = useState(false)  // useState para cancelar as ações futuras dos components

    const auth = getAuth() //serve para pegar o sistema de authenticação do firebase, funções de authenticação

    //função que verifica o cancelled ,
    function checkIfIsCancelled(){
        if (cancelled){
            return;
        }
    }

    //************ FUNÇÃO REGISTER USER */
    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)

        setError(null)

        try{

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

        }catch (error){
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes('Password')){
                systemErrorMessage = "Password must have at least 6 characters"
            }else if(error.message.includes('email-already')){
                systemErrorMessage = "E-mail already registered"
            }else if(error.code = 400){
                systemErrorMessage = "Invalid E-mail"
            }else{
                systemErrorMessage = "An error has occured, please try again later"
            }
            setError(systemErrorMessage);
        }
        setLoading(false);
    };


    //************ FUNÇÃO LOGOUT */
    const logout = ()=>{
        checkIfIsCancelled

        signOut(auth)
    }

     //************ FUNÇÃO LOGIN ****  vamos declarar como asyncorna para podermos utilizar o awaiot, pois diferentemente do logout, aqui estaremos indo buscar dados na api /
    const login = async (data)=>{
        checkIfIsCancelled()

        setLoading(true)
        setError(false)

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password)

        }catch (error){
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage;
            if (error.code = 900) {
                systemErrorMessage = "Wrong Credentials. Verify user or/and Password"
            }else{
                systemErrorMessage = "An error has ocurred. Please try again later"
            }
            setError(systemErrorMessage)
        }
        setLoading(false)
    }

    //useEffect que vai colocar o canceled como true assim que sairmos desta página:
    useEffect(()=> {
        return () => setCancelled(true);
    }, []) // o array vazio indica para ser exectado uma vz só

    return{
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}