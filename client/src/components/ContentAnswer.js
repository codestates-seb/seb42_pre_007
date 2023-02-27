import React, { useState } from 'react'
import axios from 'axios';
import { FaCaretUp,FaCaretDown } from "react-icons/fa";
import { ContentContainer,Vote,ContentBox,ContentText,ContentBottom,ButtonBox,WriterBox } from '../styles/contentcss';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const ContentAnswer = ({answer}) => {
  const [ answerVote, setAnswerVote ] = useState(answer.votes);
  const answerVoteUp = ()=>{
    setAnswerVote(answerVote+1)
  }
  const answerVoteDown = ()=>{
    setAnswerVote(answerVote-1)
  }

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
          <button>Delete</button>
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