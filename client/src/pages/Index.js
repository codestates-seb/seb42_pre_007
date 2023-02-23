import React from 'react'
import styled from 'styled-components'

const IndexWrap = styled.div`
  padding: 10vw 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Index = () => {
  return (
    <IndexWrap><img src='/logo.png' alt='stack overflow' /></IndexWrap>
  )
}

export default Index