import React, { useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const HeaderWrap = styled.div`
  width: 100%;
  position: fixed;
  z-index: 999;
  left: 50%; top: 0; transform: translateX(-50%);
  height: 50px;
  box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);
  background: var(--silver);
  padding: 0 10vw;
`;
const HeaderContent = styled.div`
  /* max-width: 1400px; */
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--gap-md);
`;
const Logo = styled.div`
  height: 30px;
  cursor: pointer;
  > img {
    width: auto;
    height: 100%; object-fit: cover;
    vertical-align: middle;
  }
`;
const SearchBar = styled.div`
  position: relative;
  flex: 1;
  margin: 0 var(--gap-large);
  > span {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  border-radius: 4px;
  border: 1px solid var(--lgray);
  padding: 0 7px 0 30px;
  background: #fff;
`;
const HeaderBtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const HeaderBtn = styled.button`
  width: 65px;
  height: 32px;
  background: ${(props)=>props.background||'var(--blue)'};
  color: ${(props)=>props.color||'#fff'};
  font-size: 13px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props)=>props.borderColor||'var(--blue)'};
  margin-left: ${(props)=>props.marginLeft||'0px'};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${(props)=>props.hoverBg||'var(--blue-hover)'};
  }
`;
const MyPageBtn = styled.button`
  width: 32px; 
  height: 32px;
  border-radius: 4px;
  background: seagreen;
`;
const Header = ({user,isLogin,setUser,setIsLogin}) => {
  const navigate = useNavigate();
  const logoutHander=()=>{
    setUser(null)
    setIsLogin(false)
    navigate('/')
  }

  return (
    <HeaderWrap>
      <HeaderContent>
        <Logo onClick={()=>navigate('/')} ><img src='/logo.png' alt='stack overflow logo' /></Logo>
        <SearchBar>
          <span><FaSearch/></span>
          <SearchInput type='text' />
        </SearchBar>

        {
          isLogin 
          ? (
            <HeaderBtnWrap>
              <MyPageBtn/>
              <HeaderBtn onClick={logoutHander} marginLeft='10px' background='var(--skyblue)' color='var(--blue)' hoverBg='var(--skyblue-hover)'>Log out</HeaderBtn>
            </HeaderBtnWrap>
          )
          : (
            <HeaderBtnWrap>
              <HeaderBtn background='var(--skyblue)' color='var(--blue)' hoverBg='var(--skyblue-hover)' onClick={()=>navigate('/users/login')}>Log in</HeaderBtn>
              <HeaderBtn marginLeft='10px' onClick={()=>navigate('/users/signup')}>Sign up</HeaderBtn>
            </HeaderBtnWrap>
          )
        }

      </HeaderContent>
    </HeaderWrap>
  )
}

export default Header