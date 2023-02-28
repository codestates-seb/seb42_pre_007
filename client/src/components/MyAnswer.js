import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { BlueButton } from '../styles/authform';
import { AnswerForm } from '../styles/contentcss';
import { useNavigate } from 'react-router-dom';

const MyAnswer = ({user,filtered}) => {
  const URI = process.env.REACT_APP_API_URI;
  const [ content, setContent ] = useState("");
  // const [ addAnswer, setAddAnswer ] = useState({
  //   content,
  //   user,
  //   votes: 0 // vote는 없던데 0 초기값??? 
  // })

  const myAnswerPost = (e) => {
    e.preventDefault();
    // const { content,user,votes } = addAnswer
    const updateAnswer = {
      content,
      user,
      votes: 0
    }
    console.log(updateAnswer)
    axios({
      method:'post',
      url: `${URI}/question/${filtered.questionId}`,
      data: updateAnswer
    })
    .then(res=>{window.location.reload()}) // 답변 추가된거 새로고침해서 보여주기??
    .catch(err=>console.log(err))
  }

  return (
    <AnswerForm>
      <MDEditor
        value={content}
        onChange={setContent}
        preview='edit'
        id='md-editor'
      />
      <BlueButton onClick={myAnswerPost}>Post Your Answer</BlueButton>
    </AnswerForm>
  )
}

export default MyAnswer