import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoImg,AuthFormWrap,AuthForm,AuthFormBox,AuthFormLabel,AuthFormInput,BlueButton,AuthLinkTo } from '../styles/authform'

const Login = () => {
  const navigate = useNavigate();
  const [ loginEmail, setLoginEmail ] = useState("");
  const [ loginPw, setLoginPw ] = useState("");
  const handleLoginEmail = (e)=>{
    let content = e.target.value;
    setLoginEmail(content)
  }
  const handleLoginPw = (e)=>{
    let content = e.target.value;
    setLoginPw(content)
  }

  return (
    <>
      <AuthFormWrap>
        <LogoImg/>
        <AuthForm action='' method='POST'>
          <AuthFormBox>
            <AuthFormLabel htmlFor='loginEmail'>Email</AuthFormLabel>
            <AuthFormInput type='text' title='loginEmail' id='loginEmail' value={loginEmail} onChange={handleLoginEmail} required />
          </AuthFormBox>
          <AuthFormBox>
            <AuthFormLabel htmlFor='loginPw'>Password</AuthFormLabel>
            <AuthFormInput type='password' title='loginPw' id='loginPw' value={loginPw} onChange={handleLoginPw} required />
          </AuthFormBox>
          <AuthFormBox>
            <BlueButton>Log in</BlueButton>
          </AuthFormBox>
        </AuthForm>
        <AuthLinkTo>Don’t have an account? <span onClick={()=>navigate('/users/signup')}>Sign up</span></AuthLinkTo>
      </AuthFormWrap>
    </>
  )
}

export default Login