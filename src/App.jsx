import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from './context/AuthContext.jsx'; 

//CSS
import './App.css'

//COMPONENTS
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { useAuthentication } from './hooks/useAuthentication.js';
import { onAuthStateChanged } from 'firebase/auth';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import CreatePost from './pages/CreatePost/CreatePost.jsx';
import Search from './pages/Search/Search.jsx';
import Post from './pages/Post/Post.jsx';
import EditPost from './pages/EditPost/EditPost.jsx';

//PAGES


function App() {
  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user ===undefined // com essa lógica vemos que o valor de loadingUser será um boolean


  useEffect(() => {

    onAuthStateChanged(auth, (user) => setUser(user))
 //                  este auth é um valor de authenticação que  basicamente é uma classe que possui algumas funcionalidade pra gerenciar a autenticação

  }, [auth]  )

  if(loadingUser){
    return <p>Loading...</p> //servirá pra informar que alguma função está sendo executada
  } //este loading desaparecerá assim que o useEffect for concluído pois ao fim dele o user será preenchido ou será falso

  return (
    <>
      <div className='App'>
        <AuthProvider value={{user}}> {/* super importante assim estarei passando o nosso user para o context, para ser usado em toda app */}
          <BrowserRouter>
          <Navbar/>
            <div className='container'>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/login' element={!user ? <Login/> : <Navigate to="/" /> } />
                <Route path='/register' element={!user ? <Register/> : <Navigate to="/" />} />
                <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
                <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to="/login"/>} />
                <Route path='/search' element={<Search /> } />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/posts/edit/:id" element={<EditPost />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </AuthProvider>

      </div>
      
    </>
  )
}

export default App
