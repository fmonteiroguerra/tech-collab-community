import React from 'react'

//por mais que nao vamos usar agora a db, mas temos que importar aqui a db firebase que configuramos , senao dá erro de app firebase nao configurado
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    //trazendo o useAhtentication feito

    const { login , error: authError, loading } = useAuthentication(); // o parentese serve pa invocar e nesse caso eu preciso invocar para que os reutrn que etão estipulad a pos o const, venham

    const handleSubmit = async (e)=>{
        e.preventDefault()

        setError("")
        
        //criar objeto user para passar como parametor pra minha função de login mais abaixo
        const user = {
            email,
            password
        }

        /* if(password !== confirmPassword){
        setError("Password does not match") 
        return ;
        } */

        const res = await login(user)

        console.log(user)
    }

    useEffect(()=>{
        setError(authError)
    }, [authError])
    return (
    <div className={styles.login}>
         <h1>Login</h1>
        <p>Welcome back! Sign in to enter.</p>
        <form onSubmit={handleSubmit}>
           
             <label>Email:
                <input 
                type='email'
                name='email' 
                required
                placeholder='User e-mail'
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
             </label>
             <label>Password:
                <input 
                type='password'
                name='password' 
                required
                placeholder='Insert a password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
             </label>
            
             {!loading ? <button type='submit' className='btn'>Login</button> : <button className='btn' disabled>Wait</button> }
             {error && <p className="error">{error}</p>}


        </form>
    </div>
  )
}

export default Login