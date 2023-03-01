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

const Login = ({setUser, setIsLogin,setAuth}) => {
  const navigate = useNavigate();
  const URI = process.env.REACT_APP_API_URI;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginEmail = (e) => {
    let content = e.target.value;
    setEmail(content);
  };
  const handleLoginPw = (e) => {
    let content = e.target.value;
    setPassword(content);
  };

  const POSTLogin = async (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: `${URI}/users/login`,
      params: {},
      data: {
        email,
        password,
      },
      //cookie credential 
      // withCredentials:true
    })
    .then((res)=>{ 
      const {authorization,refresh}=res.headers;
      sessionStorage.setItem("authorization",authorization);
      localStorage.setItem("refresh",refresh);
      setAuth(authorization) 
      navigate('/')
      setIsLogin(true)
      setUser(res.data)
      console.log(res.data)
      console.log(res.headers.authorization)
    })
    .catch((err)=>{console.log(err)})
  };

  //* 로그인 시도 -> 토큰발행api 요청 보내 -> 토큰을 response -> 
  //* 우리가 헤더에 껴서 보냄 -> 서버가 토큰 비교해서 -> 로그인 요청한 애한테 정보 제공 ????

  return (
    <AuthFormWrap>
      <LogoImg />
      <AuthForm>
        <AuthFormBox>
          <AuthFormLabel htmlFor='loginEmail'>Email</AuthFormLabel>
          <AuthFormInput
            type='text'
            title='loginEmail'
            id='loginEmail'
            value={email}
            onChange={handleLoginEmail}
            required
          />
        </AuthFormBox>
        <AuthFormBox>
          <AuthFormLabel htmlFor='loginPw'>Password</AuthFormLabel>
          <AuthFormInput
            type='password'
            title='loginPw'
            id='loginPw'
            value={password}
            onChange={handleLoginPw}
            required
          />
        </AuthFormBox>
        <AuthFormBox>
          <BlueButton onClick={POSTLogin}>Log in</BlueButton>
        </AuthFormBox>
      </AuthForm>
      <AuthLinkTo>
        Don’t have an account?{' '}
        <span onClick={() => navigate('/users/signup')}>Sign up</span>
      </AuthLinkTo>
    </AuthFormWrap>
  );
};

export default Login;
