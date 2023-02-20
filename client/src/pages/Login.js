import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoImg,AuthFormWrap,AuthForm,AuthFormBox,AuthFormLabel,AuthFormInput,BlueButton,AuthLinkTo } from '../styles/authform'

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <AuthFormWrap>
        <LogoImg/>
        <AuthForm action='' method=''>
          <AuthFormBox>
            <AuthFormLabel htmlFor='loginEmail'>Email</AuthFormLabel>
            <AuthFormInput type='text' title='loginEmail' id='loginEmail' />
          </AuthFormBox>
          <AuthFormBox>
            <AuthFormLabel htmlFor='loginPw'>Password</AuthFormLabel>
            <AuthFormInput type='password' title='loginPw' id='loginPw' />
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