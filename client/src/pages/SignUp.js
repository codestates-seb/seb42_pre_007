import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoImg,AuthFormWrap,AuthForm,AuthFormBox,AuthFormLabel,AuthFormInput,BlueButton,AuthLinkTo } from '../styles/authform'

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <>
      <AuthFormWrap>
        <LogoImg/>
        <AuthForm action='' method=''>
          <AuthFormBox>
            <AuthFormLabel htmlFor='signUpName'>Display name</AuthFormLabel>
            <AuthFormInput type='text' title='signUpName' id='signUpName' />
          </AuthFormBox>
          <AuthFormBox>
            <AuthFormLabel htmlFor='signUpEmail'>Email</AuthFormLabel>
            <AuthFormInput type='text' title='signUpEmail' id='signUpEmail' />
          </AuthFormBox>
          <AuthFormBox>
            <AuthFormLabel htmlFor='signUpPw'>Password</AuthFormLabel>
            <AuthFormInput type='password' title='signUpPw' id='signUpPw' />
          </AuthFormBox>
          <AuthFormBox>
            <BlueButton>Sign up</BlueButton>
          </AuthFormBox>
        </AuthForm>
        <AuthLinkTo>Already have an account? <span onClick={()=>navigate('/users/login')}>Log in</span></AuthLinkTo>
      </AuthFormWrap>
    </>
  )
}

export default SignUp