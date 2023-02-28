import "./styles/variable.css";
import { GlobalStyle } from "./styles/globalStyle";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Main from "./pages/Main";
import Ask from "./pages/Ask";
import axios from "axios";

function App() {
  const [ user, setUser ] = useState(null)
  const [ isLogin, setIsLogin ] = useState(false)
  const [ auth, setAuth ] = useState(null)

  const URI=process.env.REACT_APP_API_URI;

useEffect(()=>{
  const authorization=sessionStorage.getItem("authorization");
  const refresh=localStorage.getItem("refresh");
  if(authorization){
    console.log(authorization);
    axios({
      method:'post',
      url:`${URI}/users/auth`,
      headers : {
        authorization
      }
    })
    .then(res=>{
      // console.log(res.data);
      setAuth(authorization);
      setIsLogin(true);
      setUser(res.data.data);
      console.log(res.data.data)
    })
    .catch(err=>console.log(err))
  }
  // else if(refresh) {
  //   console.log(refresh);
  //   axios({
  //     method:'post',
  //     url:`${URI}/users/auth`,
  //     headers : {
  //       refresh
  //     }
  //   })
  //   .then(res=>{
  //     console.log(res.headers['authorization'])
  //     console.log(res.data)
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
  // }
},[])

  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Header isLogin={isLogin} user={user} setUser={setUser} setIsLogin={setIsLogin} setAuth={setAuth} />
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/users/login' element={<Login setUser={setUser} setIsLogin={setIsLogin} setAuth={setAuth} />} />
        <Route path='/users/signup' element={<SignUp/>} />
        <Route path='/questions/:questionId' element={<Main user={user} />} />
        <Route path='/questions/ask' element={isLogin&&<Ask user={user} auth={auth}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
