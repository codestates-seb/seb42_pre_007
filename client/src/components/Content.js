import React, { useState } from 'react'
import data from '../data/data.json';
import MyAnswer from './MyAnswer';
import ContentAnswer from './ContentAnswer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BlueButton } from '../styles/authform';
import { FaCaretUp,FaCaretDown } from "react-icons/fa";
import { ContentWrap,ContentTop,ContentTopTitle,ContentContainer,Vote,ContentBox,ContentText,ContentBottom,TagBox,ButtonBox,WriterBox } from '../styles/contentcss';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const Content = ({user}) => {
  const URI = process.env.REACT_APP_API_URI;
  const { questionId } = useParams(); 
  const filtered = data.filter((item)=> item.questionId === parseInt(questionId) )[0];
  const [ questionVote, setQuestionVote ] = useState(filtered.votes);

  //! user id랑 로그인된 id랑 같으면 delete 버튼 노출???

  // vote 클릭
  const questionVoteUp = () =>{
    setQuestionVote(questionVote+1)
    axios({
      method: 'post',
      url: `${URI}/question/${questionId}`,
      params: {},
      data: {
        votes : questionVote
      },
    })
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})
  }
  const questionVoteDown = () =>{
    setQuestionVote(questionVote-1)
    axios({
      method: 'post',
      url: `${URI}/question/${questionId}`,
      params: {},
      data: {
        votes : questionVote
      },
    })
    .then((res)=>{console.log(res)})
    .catch((err)=>{console.log(err)})
  }

  return (
    <ContentWrap>
      <ContentTop>
        <ContentTopTitle>
          <h2>{filtered.title}</h2>
          <ul>
            <li><span>Asked</span>{dayjs(filtered.createdAt).fromNow()}</li>
            <li><span>Modified</span>{dayjs(filtered.createdAt).fromNow()}</li>
            <li><span>Viewed</span> {filtered.view}</li>
          </ul>
        </ContentTopTitle>
        <BlueButton>Ask Questions</BlueButton>
      </ContentTop>
      <ContentContainer>
        <Vote>
          <button onClick={questionVoteUp}><FaCaretUp/></button>
          <span>{questionVote}</span>
          <button onClick={questionVoteDown}><FaCaretDown/></button>
        </Vote>
        <ContentBox>
          <ContentText>
            {filtered.content}
          </ContentText>
          <TagBox>
            <div className='tag'>git</div>
            <div className='tag'>github</div>
          </TagBox>
          <ContentBottom>
            <ButtonBox>
              <button>Share</button>
              <button>Edit</button>
              <button>Delete</button>
            </ButtonBox>
            <WriterBox>
              <div background='#fff'>
                <div>Modified {dayjs(filtered.createdAt).fromNow()}</div>
                <p><img src='https://picsum.photos/200' alt={`${filtered.user}`} /><span>{filtered.user}</span></p>
              </div>
              <div>
                <div>asked {dayjs(filtered.createdAt).fromNow()}</div>
                <p><img src='https://picsum.photos/200' alt={`${filtered.user}`} /><span>{filtered.user}</span></p>
              </div>
            </WriterBox>
          </ContentBottom>
        </ContentBox>
      </ContentContainer>
      <h3 className='divider'>{filtered.answer.length} Answers</h3>

      {
        filtered.answer && (
          filtered.answer.map(answer => (
            <ContentAnswer answer={answer} key={answer.answerId} />
          ))
        )
      }

      <h3 className='divider'>Your Answers</h3>
      <MyAnswer user={user} filtered={filtered} />
    </ContentWrap>
  )
}

export default Content