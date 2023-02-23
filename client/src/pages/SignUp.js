import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoImg,AuthFormWrap,AuthForm,AuthFormBox,AuthFormLabel,AuthFormInput,BlueButton,AuthLinkTo } from '../styles/authform'
import axios  from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URI

  const [ signName, setSignName ] = useState("");
  const [ signEmail, setSignEmail ] = useState("");
  const [ signPw, setSignPw ] = useState("");

  const handleSignName=(e)=>{
    let content = e.target.value;
    setSignName(content)
  }
  const handleSignEmail=(e)=>{
    let content = e.target.value;
    setSignEmail(content)
  }
  const handleSignPw=(e)=>{
    let content = e.target.value;
    setSignPw(content)
  }

  const POSTSignUp = async(e)=>{
    e.preventDefault()
    axios({
      method: 'post',
      url: `${URI}`,
      params: {
        signName,
        signEmail,
        signPw
      },
      data: {
        signName,
        signEmail,
        signPw
      }
    })
  }

  return (
    <AuthFormWrap>
      <LogoImg/>
      <AuthForm>
        <AuthFormBox>
          <AuthFormLabel htmlFor='signUpName'>Display name</AuthFormLabel>
          <AuthFormInput type='text' title='signUpName' id='signUpName' value={signName} onChange={handleSignName}  required/>
        </AuthFormBox>
        <AuthFormBox>
          <AuthFormLabel htmlFor='signUpEmail'>Email</AuthFormLabel>
          <AuthFormInput type='text' title='signUpEmail' id='signUpEmail' value={signEmail} onChange={handleSignEmail} required />
        </AuthFormBox>
        <AuthFormBox>
          <AuthFormLabel htmlFor='signUpPw'>Password</AuthFormLabel>
          <AuthFormInput type='password' title='signUpPw' id='signUpPw' value={signPw} onChange={handleSignPw} required/>
        </AuthFormBox>
        <AuthFormBox>
          <BlueButton onClick={POSTSignUp}>Sign up</BlueButton>
        </AuthFormBox>
      </AuthForm>
      <AuthLinkTo>Already have an account? <span onClick={()=>navigate('/users/login')}>Log in</span></AuthLinkTo>
    </AuthFormWrap>
  )
}

export default SignUp