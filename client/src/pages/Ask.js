import { AskForm } from "../components/AskForm";
import styled from "styled-components";

const AskPage=styled.main`
display:flex;
justify-content:center;
background-color: #f8f9f9;
width: 100%;
padding-bottom: 30px;
`

function Ask ({user}) {
  return (
    <AskPage>
      <AskForm user={user}/>
    </AskPage>
  )
}

export default Ask