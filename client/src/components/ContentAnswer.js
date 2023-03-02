import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaCaretUp,FaCaretDown } from "react-icons/fa";
import { ContentContainer,Vote,ContentBox,ContentText,ContentBottom,ButtonBox,WriterBox } from '../styles/contentcss';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { URI } from '../App';
dayjs.extend(relativeTime);
dayjs.locale("ko");

const ContentAnswer = ({answer,auth,questionId}) => {
  const [ answerVote, setAnswerVote ] = useState(answer.votes);

useEffect(()=>{
  console.log(answer)
},[])

  const answerVoteUp = ()=>{
    axios({
      method:'post',
      url:`${URI}/questions/${questionId}/answer/submit/${answer.answerId}/votes/up`,
      headers:{
        authorization:auth
      }
    }).then(res=>{
      console.log(res)
      setAnswerVote(answerVote+1)
    });
  }
  const answerVoteDown = ()=>{
    axios({
      method:'post',
      url:`${URI}/questions/${questionId}/answer/submit/${answer.answerId}/votes/down`,
      headers:{
        authorization:auth
      }
    }).then(res=>{
      console.log(res)
      setAnswerVote(answerVote-1)
    });
  }

  const answerRemove=()=>{
    axios({
      method:'delete',
      url:`${URI}/questions/${questionId}/answer/submit/${answer.answerId}`,
      headers:{
        authorization:auth
      }
    }).then(res=> {
      console.log(res);
      window.location.reload();
    })
  }

  useEffect(()=>{
    console.log(answer)
  },[])

  return (
    <ContentContainer>
    <Vote>
      <button onClick={answerVoteUp}><FaCaretUp/></button>
      <span>{answerVote}</span>
      <button onClick={answerVoteDown}><FaCaretDown/></button>
    </Vote>
    <ContentBox>
      <ContentText>
        {answer.content}
      </ContentText>
      <ContentBottom>
        <ButtonBox>
          <button>Share</button>
          <button>Edit</button>
          <button onClick={answerRemove}>Delete</button>
        </ButtonBox>
        <WriterBox>
          <div background='#fff'>
            <div>Modified {dayjs(answer.createdAt).fromNow()}</div>
            <p><img src='https://picsum.photos/200' alt={`${answer.user}`} /><span>{answer.user}</span></p>
          </div>
          <div>
            <div>asked {dayjs(answer.createdAt).fromNow()}</div>
            <p><img src='https://picsum.photos/200' alt={`${answer.user}`} /><span>{answer.user}</span></p>
          </div>
        </WriterBox>
      </ContentBottom>
    </ContentBox>
  </ContentContainer>
  )
}

export default ContentAnswer