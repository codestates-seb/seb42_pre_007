import { AskForm } from "../components/AskForm";
import styled from "styled-components";
import Footer from "../components/Footer";

const AskPage=styled.main`
display:flex;
flex-direction: column;
align-items: center;
/* justify-content:center; */
background-color: #f8f9f9;
width: 100%;
padding-top:50px;
`

function Ask ({user,auth}) {
  return (
    <AskPage>
      <AskForm user={user} auth={auth} />
      <Footer/>
    </AskPage>
  )
}

export default Ask