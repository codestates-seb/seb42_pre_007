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

const Content = ({user,auth}) => {
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

  useEffect(()=>{
    setQuestionVote(contentData.votes)
  },[contentData])

  // vote 클릭
  const questionVoteUp = () =>{
    axios({
      method: 'post',
      url: `${URI}/questions/${questionId}/votes/up`,
      headers:{
        Authorization:auth
      }
    })
    .then((res)=>{
      setQuestionVote(prevState=>prevState+1)
    })
    .catch((err)=>{})
  }
  const questionVoteDown = () =>{
    axios({
      method: 'post',
      url: `${URI}/questions/${questionId}/votes/down`,
      headers:{
        Authorization:auth
      }
    })
    .then((res)=>{
      setQuestionVote(prevState=>prevState-1)
    })
    .catch((err)=>{})
  }

  const questionRemove=()=>{
    axios({
      method:'delete',
      url:`${URI}/questions/${questionId}`,
      headers:{
        authorization:auth
      }
    }).then(res=>navigate('/'))
    .catch(err=>{});
  }

const questionEdit=()=>{
  navigate(`/questions/${questionId}/edit`)
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
          {contentData.tags&&<TagBox>
            {contentData.tags.map(tag=>{
              return <div key={tag} className='tag'>{tag}</div>
            })}
          </TagBox>}
          <ContentBottom>
            <ButtonBox>
              <button>Share</button>
              <button onClick={questionEdit}>Edit</button>
              <button onClick={questionRemove}>Delete</button>
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
      {contentData.answers&&<h3 className='divider'>{contentData.answers.length} Answers</h3>}

      {
        contentData.answers && (
          contentData.answers.map(answer => (
            <ContentAnswer answer={answer} key={answer.answerId} user={user} auth={auth} questionId={questionId} />
          ))
        )
      }

      <h3 className='divider'>Your Answers</h3>
      <MyAnswer user={user} contentData={contentData} auth={auth} />
    </ContentWrap>
  )
}

export default Content