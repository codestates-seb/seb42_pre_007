import "./styles/variable.css";
import { GlobalStyle } from './globalStyle';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route path='/users/login' element={<Login/>} />
        <Route path='/users/signup' element={<SignUp/>} />
      </Routes>
  </BrowserRouter>
  )
}

export default App;
