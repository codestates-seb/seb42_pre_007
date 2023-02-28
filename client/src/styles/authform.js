import styled from 'styled-components';

// 로그인, 회원가입 form 공통 요소
export const LogoImg = styled.div`
  width: 32px;
  height: 37px;
  background-image: url(/logo.png);
  background-repeat: no-repeat;
  background-position: left top;
  background-size: cover;
  margin-bottom: var(--gap-large);
`;
export const AuthFormWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--silver);
`;
export const AuthForm = styled.form`
  width: ${(props) => props.width||'300px'};
  padding: var(--gap-large);
  background: #fff;
  border-radius: 6px;
  box-shadow: var(--shadow);
`;
export const AuthFormBox = styled.div`
  margin-bottom: var(--gap-md);
`;
export const AuthFormLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--black);
`;
export const AuthFormInput = styled.input`
  width: 100%;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  border: 1px solid var(--lgray);
  padding: 0 7px;
  margin-top: 5px;
  font-size: var(--fz-sm);
`;
export const AuthLinkTo = styled.div`
  text-align: center;
  margin-top: var(--gap-large);
  > span {
    padding-left: var(--gap-sm);
    color: var(--blue);
    cursor: pointer;
  }
`;
export const BlueButton = styled.button`
  position: relative;
  width: ${(props)=>props.width||'100%'};
  height: 40px;
  border-radius: 4px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  background: ${(props)=>props.background||'var(--blue)'};
  color: #fff;
  cursor: pointer;
  box-shadow: inset 0 1px rgba(255,255,255,.3);
  border-top: 1px solid var(--blue);
  border-bottom: 1px solid transparent;
  &:hover {
    background: var(--blue-hover);
    border-color: var(--blue-hover);
  }
`;