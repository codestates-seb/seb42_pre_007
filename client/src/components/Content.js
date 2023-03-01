import React, { useEffect, useState } from 'react'
import data from '../data/data.json';
import MyAnswer from './MyAnswer';
import ContentAnswer from './ContentAnswer';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BlueButton } from '../styles/authform';
import { FaCaretUp,FaCaretDown } from "react-icons/fa";
import { ContentWrap,ContentTop,ContentTopTitle,ContentContainer,Vote,ContentBox,ContentText,ContentBottom,TagBox,ButtonBox,WriterBox } from '../styles/contentcss';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

const Content = ({user}) => {
  const navigate=useNavigate();
  const URI = process.env.REACT_APP_API_URI;
  const { questionId } = useParams(); 
  const [ contentData, setContentData ] = useState([])
  const [ questionVote, setQuestionVote ] = useState(contentData.votes);

  const getQuestion = async () => {
    const questionContent = await axios.get(`${URI}/questions/${questionId}`)
    setContentData(questionContent.data.data)
  }
  useEffect(()=>{
    getQuestion()
  },[])

  // vote 클릭
  const questionVoteUp = () =>{
    setQuestionVote(questionVote+1)
    axios({
      method: 'post',
      url: `${URI}/questions/${questionId}`,
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
      url: `${URI}/questions/${questionId}`,
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
          <h2>{contentData.title}</h2>
          <ul>
            <li><span>Asked</span>{dayjs(contentData.createdAt).fromNow()}</li>
            <li><span>Modified</span>{dayjs(contentData.createdAt).fromNow()}</li>
            <li><span>Viewed</span> {contentData.view}</li>
          </ul>
        </ContentTopTitle>
        <BlueButton onClick={(()=>navigate('/questions/ask'))}>Ask Questions</BlueButton>
      </ContentTop>
      <ContentContainer>
        <Vote>
          <button onClick={questionVoteUp}><FaCaretUp/></button>
          <span>{questionVote}</span>
          <button onClick={questionVoteDown}><FaCaretDown/></button>
        </Vote>
        <ContentBox>
          <ContentText>
            {contentData.content}
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
                <div>Modified {dayjs(contentData.createdAt).fromNow()}</div>
                <p><img src='https://picsum.photos/200' alt={`${contentData.user}`} /><span>{contentData.user}</span></p>
              </div>
              <div>
                <div>asked {dayjs(contentData.createdAt).fromNow()}</div>
                <p><img src='https://picsum.photos/200' alt={`${contentData.user}`} /><span>{contentData.user}</span></p>
              </div>
            </WriterBox>
          </ContentBottom>
        </ContentBox>
      </ContentContainer>
      {contentData.answer&&<h3 className='divider'>{contentData.answer.length} Answers</h3>}

      {
        contentData.answer && (
          contentData.answer.map(answer => (
            <ContentAnswer answer={answer} key={answer.answerId} />
          ))
        )
      }

      <h3 className='divider'>Your Answers</h3>
      <MyAnswer user={user} contentData={contentData} />
    </ContentWrap>
  )
}

export default Content