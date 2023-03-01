import React, { useState } from 'react'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import { BlueButton } from '../styles/authform';
import { AnswerForm } from '../styles/contentcss';

const MyAnswer = ({user,contentData}) => {
  const URI = process.env.REACT_APP_API_URI;
  const [ content, setContent ] = useState("");

  const myAnswerPost = (e) => {
    e.preventDefault();
    const updateAnswer = {
      content,
      user
    }
    console.log(updateAnswer)
    axios({
      method:'post',
      url: `${URI}/question/${contentData.questionId}`,
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