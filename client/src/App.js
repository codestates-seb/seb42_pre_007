import "./styles/variable.css";
import { GlobalStyle } from "./styles/globalStyle";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Ask from "./pages/Ask";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route path='/users/login' element={<Login/>} />
        <Route path='/users/signup' element={<SignUp/>} />
        <Route path='/ask' element={<Ask/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
