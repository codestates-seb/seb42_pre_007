import styled from 'styled-components';
import Footer from '../components/Footer';
import { EditForm } from '../components/EditForm';


const EditContainer=styled.section`
display:flex;
flex-direction: column;
align-items: center;
width: 100%;
padding-top:50px;
`

function Edit({user,auth}) {
  

  return (
  <EditContainer>
    <EditForm user={user} auth={auth}/>
    <Footer/>
    </EditContainer>
  )
}

export default Edit;
