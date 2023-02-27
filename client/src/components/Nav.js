import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FaGlobeAmericas } from "react-icons/fa";

const NavContainer = styled.div`
  width: 165px;
  border-right: 1px solid var(--silver);
  position: fixed;
  left: 10vw;
  top: 50px;
  height: calc(100vh - 50px);
`;
const NavBox = styled.div`
  padding-top: 30px;
  color: var(--dgray);
  font-size: 13px;
  > .nav-item {margin-bottom: 20px;}
  > span {display: block; width: 100%; padding-left: 10px; margin-bottom: 5px;}
  .nav-item {
    position: relative;
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    cursor: pointer;
  }
  .nav-item.active {
    background: var(--silver);
    font-weight: 600;
    color: var(--black);
  }
  .nav-item.active:after {
    content: '';
    position: absolute;
    right: 0; 
    top: 0;
    bottom: 0;
    width: 3px;
    background: var(--orange);
  }
`;
const NavList = styled.ul`
  width: 100%;
`;
const NavItem = styled.li`
  > .nav-item {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
    > span {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-45%);
    }
  }
`;

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <NavContainer>
      <NavBox>
        <p className='nav-item'>Home</p>
        <span>PUBLIC</span>
        <NavList>
          <NavItem><p className={`${location}.includes('question') ? nav-item active : nav-item`} onClick={()=>navigate('/users/login')}><span><FaGlobeAmericas/></span> Questions</p></NavItem>
          <NavItem><p className='nav-item'>Tags</p></NavItem>
          <NavItem><p className='nav-item'>Users</p></NavItem>
        </NavList>
      </NavBox>
    </NavContainer>
  )
}

export default Nav