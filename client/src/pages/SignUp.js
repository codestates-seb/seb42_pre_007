import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogoImg,
  AuthFormWrap,
  AuthForm,
  AuthFormBox,
  AuthFormLabel,
  AuthFormInput,
  BlueButton,
  AuthLinkTo,
} from '../styles/authform';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URI;

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignName = (e) => {
    let content = e.target.value;
    setDisplayName(content);
  };
  const handleSignEmail = (e) => {
    let content = e.target.value;
    setEmail(content);
  };
  const handleSignPw = (e) => {
    let content = e.target.value;
    setPassword(content);
  };

  const POSTSignUp = async (e) => {
    e.preventDefault();
    await axios({
      method: 'post',
      url: `${URI}/users/signup`,
      params: {},
      data: {
        displayName,
        email,
        password,
      },
      // withCredentials:true
    })
    .then((res)=>{ 
      alert('회원가입 완료')
      navigate('/users/login')
    })
    .catch((err)=>{console.log(err)})
  };

  return (
    <AuthFormWrap>
      <LogoImg />
      <AuthForm>
        <AuthFormBox>
          <AuthFormLabel htmlFor='signUpName'>Display name</AuthFormLabel>
          <AuthFormInput
            type='text'
            title='signUpName'
            id='signUpName'
            value={displayName}
            onChange={handleSignName}
            required
          />
        </AuthFormBox>
        <AuthFormBox>
          <AuthFormLabel htmlFor='signUpEmail'>Email</AuthFormLabel>
          <AuthFormInput
            type='text'
            title='signUpEmail'
            id='signUpEmail'
            value={email}
            onChange={handleSignEmail}
            required
          />
        </AuthFormBox>
        <AuthFormBox>
          <AuthFormLabel htmlFor='signUpPw'>Password</AuthFormLabel>
          <AuthFormInput
            type='password'
            title='signUpPw'
            id='signUpPw'
            value={password}
            onChange={handleSignPw}
            required
          />
        </AuthFormBox>
        <AuthFormBox>
          <BlueButton onClick={POSTSignUp}>Sign up</BlueButton>
        </AuthFormBox>
      </AuthForm>
      <AuthLinkTo>
        Already have an account?{' '}
        <span onClick={() => navigate('/users/login')}>Log in</span>
      </AuthLinkTo>
    </AuthFormWrap>
  );
};

export default SignUp;