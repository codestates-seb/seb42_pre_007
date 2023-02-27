import "./styles/variable.css";
import { GlobalStyle } from "./styles/globalStyle";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Ask from "./pages/Ask";

function App() {
  const [ user, setUser ] = useState(null)
  const [ isLogin, setIsLogin ] = useState(false)
  const [ auth, setAuth ] = useState(null)

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Header isLogin={isLogin} user={user} setUser={setUser} setIsLogin={setIsLogin} />
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/users/login' element={<Login setUser={setUser} setIsLogin={setIsLogin} setAuth={setAuth} />} />
        <Route path='/users/signup' element={<SignUp/>} />
        <Route path='/questions/:questionId' element={<Main user={user} />} />
        <Route path='/questions/ask' element={<Ask/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
