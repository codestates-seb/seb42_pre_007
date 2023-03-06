import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import {
  ContentContainer,
  Vote,
  ContentBox,
  ContentText,
  ContentBottom,
  ButtonBox,
  WriterBox,
} from '../styles/contentcss';
import { BlueButton } from '../styles/authform';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { URI } from '../App';
import MDEditor from '@uiw/react-md-editor';
dayjs.extend(relativeTime);
dayjs.locale('ko');

const ContentAnswer = ({ answer, auth, questionId,user }) => {
  const [answerVote, setAnswerVote] = useState(answer.votes);
  const [isEdit, setIsEdit] = useState(false);
  const [editAnswer, setEditAnswer] = useState(answer.content);


  const answerVoteUp = () => {
    axios({
      method: 'post',
      url: `${URI}/questions/${questionId}/answer/submit/${answer.answerId}/votes/up`,
      headers: {
        authorization: auth,
      },
    }).then((res) => {
      setAnswerVote(answerVote + 1);
    });
  };
  const answerVoteDown = () => {
    axios({
      method: 'post',
      url: `${URI}/questions/${questionId}/answer/submit/${answer.answerId}/votes/down`,
      headers: {
        authorization: auth,
      },
    }).then((res) => {
      setAnswerVote(answerVote - 1);
    });
  };

  const answerRemove = () => {
    axios({
      method: 'delete',
      url: `${URI}/questions/${questionId}/answer/submit/${answer.answerId}`,
      headers: {
        authorization: auth,
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  const isEditHandler = () => {
    if (isEdit) {
      setIsEdit(false);
      setEditAnswer(answer.content);
    } else {
      setIsEdit(true);
    }
  };

  const patchAnswer = () => {
    axios({
      method:'patch',
      url:`${URI}/questions/${questionId}/answer/submit/${answer.answerId}`,
      data:{
        content:editAnswer,
        user:user['displayName']
      },
      headers:{
        authorization:auth,
      }
    })
    .then(()=>{
      window.location.reload()
    })
    .catch(err=>{})
  };


  return (
    <ContentContainer>
      <Vote>
        <button onClick={answerVoteUp}>
          <FaCaretUp />
        </button>
        <span>{answerVote}</span>
        <button onClick={answerVoteDown}>
          <FaCaretDown />
        </button>
      </Vote>
      <ContentBox>
        {isEdit ? (
          <MDEditor
            value={editAnswer}
            onChange={setEditAnswer}
            preview='edit'
            id='md-editor'></MDEditor>
        ) : (
          <ContentText>{answer.content}</ContentText>
        )}
        <ContentBottom>
          {isEdit ? (
            <ButtonBox>
              <BlueButton style={{color:'white',width:'100px',marginRight:'10px'}} onClick={patchAnswer}>
                Save Edits
              </BlueButton>
              <button onClick={isEditHandler}>Cancel</button>
            </ButtonBox>
          ) : (
            <ButtonBox>
              <button>Share</button>
              <button onClick={isEditHandler}>Edit</button>
              <button onClick={answerRemove}>Delete</button>
            </ButtonBox>
          )}
          <WriterBox>
            <div background='#fff'>
              <div>Modified {dayjs(answer.createdAt).fromNow()}</div>
              <p>
                <img
                  src='https://picsum.photos/200'
                  alt={`${answer.user}`}
                />
                <span>{answer.user}</span>
              </p>
            </div>
            <div>
              <div>asked {dayjs(answer.createdAt).fromNow()}</div>
              <p>
                <img
                  src='https://picsum.photos/200'
                  alt={`${answer.user}`}
                />
                <span>{answer.user}</span>
              </p>
            </div>
          </WriterBox>
        </ContentBottom>
      </ContentBox>
    </ContentContainer>
  );
};

export default ContentAnswer;
