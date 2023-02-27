import React from 'react'
import styled from 'styled-components'
import { LogoImg } from '../styles/authform';

const FooterWrap = styled.footer`
  position: relative;
  z-index: 999;
  width: 100%;
  background: var(--black);
  padding: var(--gap-large) 10vw;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .flexbox {
    width: 20%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    > ${LogoImg} {
      margin-right: 20px;
    }
  }
`;
const FooterBox = styled.div`
  color: var(--lgray);
  width: 20%;
  h3 {
    font-size: 16px;
    line-height: 20px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  li {
    font-size: 13px;
    line-height: 26px;
    text-transform: capitalize;
    cursor: pointer;
  }
`;
const FooterLink = styled.div`
  color: var(--lgray);
  width: 20%;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 12px;
  line-height: 16px;
  ul {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  li {
    margin-right: 15px;
  }
`;


const Footer = () => {
  const product = ["teams","advertising","collectives","talent"];
  const company = ["about","press","work here","legal","privacy policy","terms ofservice","contact us","cookie settings","cookie policy"]
  const network = ["technology","culture & recreation","life & arts","science","professional","business","API","data"]
  const links = ["Blog","Facebook","Twitter","LinkedIn","Instagram"]
  return (
    <FooterWrap>
      <div className='flexbox'>
        <LogoImg/>
        <FooterBox>
          <h3>stack overflow</h3>
          <ul>
            <li>questions</li>
            <li>help</li>
          </ul>
        </FooterBox>
      </div>
      <FooterBox>
        <h3>products</h3>
        <ul>
          {product.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
      </FooterBox>
      <FooterBox>
        <h3>company</h3>
        <ul>
          {company.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
      </FooterBox>
      <FooterBox>
        <h3>stack exchange network</h3>
        <ul>
          {network.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
      </FooterBox>
      <FooterLink>
        <ul>
          {links.map((item,index)=><li key={index}>{item}</li>)}
        </ul>
        <div>
          Site design / logo © 2023 Stack Exchange Inc; user contributions licensed under CC BY-SA. rev 2023.2.17.43248
        </div>
      </FooterLink>
    </FooterWrap>
  )
}

export default Footer