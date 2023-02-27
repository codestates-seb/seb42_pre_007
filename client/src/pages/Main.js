import React from 'react'
import styled from 'styled-components'
import Nav from '../components/Nav';
import Content from '../components/Content';
import Footer from '../components/Footer';

const MainWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 50px;
  width: 100%;
  padding: 0 10vw;
`;
const Main = ({user}) => {
  return (
    <>
      <MainWrap>
        <Nav/>
        <Content user={user} />
      </MainWrap>
      <Footer/>
    </>
  )
}

export default Main