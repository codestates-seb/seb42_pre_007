import "./styles/variable.css";
import "./App.css";
import { GlobalStyle } from "./globalStyle";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Routes>
        <Route path='/users/login' element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
 }

export default App;
