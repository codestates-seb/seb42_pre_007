import styled from 'styled-components';
import { BlueButton } from './authform';

export const ContentWrap = styled.div`
  width: calc(100% - 165px);
  margin-left: 165px;
  padding: var(--gap-large);
  .divider {
    font-size: 20px;
    margin-top: 20px;
  }
`;
export const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--silver);
  > ${BlueButton} {
    width: 110px;
    flex: none;
    font-size: 13px;
    font-weight: normal;
  }
`;
export const ContentTopTitle = styled.div`
  > h2 {font-size: 27px; font-weight: bold;}
  > ul {
    display: flex; justify-content: flex-start; align-items: center;
    color: var(--dgray);
    margin-top: 20px;
    font-size: 13px;
    li {
      margin-right: 20px;
    }
    span {
      color: var(--lgray);
      padding-right: 5px;
    }
  }
`;
export const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  padding: var(--gap-large) 0;
  border-bottom: 1px solid var(--silver);
`;
export const Vote = styled.div`
  width: 60px;
  text-align: center;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    font-size: 50px;
    color: var(--lgray);
    cursor: pointer;
  }
`;
export const ContentBox = styled.div`
  width: calc(100% - 80px);
`;
export const ContentText = styled.div`
  font-size: 16px;
  line-height: 24px;
  min-height: 60px;
  > pre {
    display: block;
    background: var(--silver);
    width: 100%;
    font-family: monospace;
    white-space: pre-wrap;
    padding: 15px;
    margin: 15px 0;
    font-size: 15px;
  }
`;
export const ContentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
`;
export const TagBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 20px;
  > .tag {
    height: 28px;
    line-height: 28px;
    text-align: center;
    padding: 0 6px;
    border-radius: 4px;
    background: var(--light-skyblue);
    color: var(--blue);
    font-size: 12px;
    margin-right: 4px;
    cursor: pointer;
  }
`;
export const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > button {
    padding-right: 10px;
    font-size: 14px;
    color: var(--lgray);
    cursor: pointer;
  }
`;
export const WriterBox =styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  > div {
    margin-left: 20px;
    padding: 15px;
    border-radius: 4px;
    > p {
      margin-top: 5px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > img {width: 30px; height: 30px; padding-right: 5px;}
    }
  }
  > div:last-of-type {
    background: var(--skyblue);
  }
`;
export const AnswerForm = styled.form`
  width: 100%;
  padding: var(--gap-large) 0;
  > ${BlueButton} {
    width: auto;
    padding: 0 var(--gap-md);
    margin-top: 15px;
  }
`;
export const AnswerTextarea = styled.textarea`
  resize: none;
  width: 100%;
  height: 200px;
  border: 1px solid var(--lgray);
  border-radius: 12px;
  padding: 15px;
  font-size: 14px;
  line-height: 22px;
`;