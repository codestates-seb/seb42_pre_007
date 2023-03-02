import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';
//styled components
import {
  AskContainer,
  AskNotice,
  AskFormButton,
  AskIntroduceCard,
  AskSingleForm,
  AskTitle,
  AskArticleWrapper,
  AskMdEditorWrapper,
  AskMdEditorBorder,
  AskWarning,
  AskTagInput,
  AskTag,
  AskPostButtonWrapper,
  AskPostButton,
  AskDiscardButton,
  AskTagOfferContainer,
  AskTagOffered,
} from '../styles/askform';
//markdown editor
import MDEditor from '@uiw/react-md-editor';
import { URI } from '../App';

const EditPadding = styled.div`
  height: 8px;
`;
let getTagsTimeout = null;
export function EditForm({user,auth}) {
  const navigate=useNavigate()
  const { questionId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  //태그 배열에 저장되기 전 input
  const [tagInput, setTagInput] = useState('');
  //유효성 체크
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [isTagsValid, setIsTagsValid] = useState(false);
  //유사 :focus 효과를 위한 state
  const [isMdEditorFocus, setIsMdEditorFocus] = useState(false);
  const [isAskTagInputFocus, setIsAskTagInputFocus] = useState(false);
  //tagInput에 따른 tag 제안
  const [tagsOffer, setTagsOffer] = useState([]);
//Edit창을 띄울 때 원본 글 데이터를 불러옵니다.
  useEffect(() => {
    axios({
      method: 'get',
      url: `${URI}/questions/${questionId}`,
    }).then((res) => {
      setTitle(res.data.data.title);
      setContent(res.data.data.content);
      setTags(res.data.data.tags);
    });
  }, []);
  //get taglist from stackexchange api after a second
  useEffect(() => {
    if (tagInput.length !== 0) {
      // console.log(`getTagsTimeout Start`);
      if (getTagsTimeout) clearTimeout(getTagsTimeout);
      getTagsTimeout = setTimeout(() => {
        axios({
          method: 'get',
          url: 'https://api.stackexchange.com/2.3/tags',
          params: {
            order: 'desc',
            sort: 'popular',
            site: 'stackoverflow',
            inname: tagInput,
          },
        })
          .then((res) => {
            setTagsOffer(res.data);
            // console.log(`getTagsTimeout Axios`);
          })
          .catch((err) => console.log(err));
      }, 500);
    } else setTagsOffer([]);
  }, [tagInput]);

  useEffect(() => {
    setIsTitleValid(title.length > 15&&title.length<=50);
  }, [title]);
  //is content length is over 30?
  useEffect(() => {
    setIsContentValid(content.length > 30&&content.length<=1000);
  }, [content]);
  //is tags array length not 0?
  useEffect(() => {
    setIsTagsValid(tags.length > 0 && tags.length <= 5);
  }, [tags]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  //tag 추가
  const tagInputHandler = (newTag) => {
    // console.log(newTag);
    if (newTag.length === 0) return;
    if (tags.includes(newTag)) {
      setTagInput('');
      setTagsOffer([]);
      return;
    }
    setTags([...tags, newTag]);
    setTagInput('');
    setTagsOffer([]);
  };
  //tag 제거
  const tagButtonHandler = (e) => {
    setTags((prevState) => {
      let newTags = [...prevState];
      newTags.splice(e.target.value, 1);
      return newTags;
    });
  };

  //edit patch
  const editButtonHandler = () => {
    if (!isTitleValid || !isContentValid || !isTagsValid) return;
    const data = {
      title,
      content,
      user: user['displayName'],
      tags,
    };
    axios({
      method: 'patch',
      url: `${URI}/questions/${questionId}`,
      data,
      headers: {
        authorization: auth,
      },
    })
      .then((res) => {
        // console.log(res.data)
        navigate(`/questions/${res.data['data']}`);
      })
      .catch((err) => {
      });
  };

  return (
    <AskContainer>
      <AskTitle>
        <h1>Edit</h1>
      </AskTitle>
      <AskSingleForm isEdit={true} step={0} nowStep={0} valid={isTitleValid} isReview={true}>
        <label className='s-label' htmlFor='title'>
          Title
        </label>
        <EditPadding></EditPadding>
        <input
          id='title'
          value={title}
          onChange={titleHandler}
          placeholder='e.g. Is there an R function htmlFor=finding the index of an element in a vector?'></input>
          {title.length === 0 ? (
            <AskWarning>Title is missing.</AskWarning>
          ) : null}
          {title.length < 15 && title.length > 0 ? (
            <AskWarning>Title must be at least 15 characters.</AskWarning>
          ) : null}
          {title.length > 50 ? (
            <AskWarning>Too long by 50 characters.</AskWarning>
          ) : null}
      </AskSingleForm>
      <AskSingleForm isEdit={true} step={1} nowStep={1}>
        <label className='s-label' htmlFor='md-editor'>
          Body
        </label>
        <EditPadding></EditPadding>
        <AskMdEditorWrapper>
          <AskMdEditorBorder
            valid={isContentValid}
            isReview={true}
            focus={isMdEditorFocus}></AskMdEditorBorder>
          <MDEditor
            onFocus={() => {
              setIsMdEditorFocus(true);
            }}
            onBlur={() => setIsMdEditorFocus(false)}
            value={content}
            onChange={setContent}
            preview='edit'
            id='md-editor'
          />
        </AskMdEditorWrapper>
        {content.length === 0 ? (
            <AskWarning>Body is missing.</AskWarning>
          ) : null}
          {content.length < 30 && content.length > 0 ? (
            <AskWarning>Body must be at least 30 characters.</AskWarning>
          ) : null}
          {content.length > 1000 ? (
            <AskWarning>Too long by 1000 characters.</AskWarning>
          ) : null}
      </AskSingleForm>
      <AskSingleForm isEdit={true} step={2} nowStep={2}>
        <label className='s-label'>Tags</label>
        
        <EditPadding></EditPadding>
        <AskTagInput
            isReview={true}
            valid={isTagsValid}
            focus={isAskTagInputFocus}>
            {tags.map((str, idx) => (
              <AskTag key={str}>
                {str}
                <button value={idx} onClick={tagButtonHandler}>
                  ✖
                </button>
              </AskTag>
            ))}
            <input
              value={tagInput}
              placeholder={
                tags.length === 0 ? `e.g. (django python .net)` : ''
              }
              onBlur={() => {
                setIsAskTagInputFocus(false);
              }}
              onFocus={() => {
                setIsAskTagInputFocus(true);
              }}
              onChange={(e) => {
                setTagInput(e.target.value);
              }}></input>
            <AskTagsOffer
              isAskTagInputFocus={isAskTagInputFocus}
              setIsAskTagInputFocus={setIsAskTagInputFocus}
              tagsOffer={tagsOffer}
              tagInputHandler={tagInputHandler}
            />
          </AskTagInput>
          {tags.length === 0 ? (
            <AskWarning>
              Please enter at least one tag; see a list of{' '}
              <a href='https://stackoverflow.com/tags'>popular tags.</a>
            </AskWarning>
          ) : null}
          {tags.length > 5 ? (
            <AskWarning>Please enter no more than 5 tags.</AskWarning>
          ) : null}
      </AskSingleForm>
      <AskPostButtonWrapper>
        <AskPostButton onClick={editButtonHandler}
            valid={isTitleValid && isContentValid && isTagsValid}>
          Save Edits
        </AskPostButton>
      </AskPostButtonWrapper>
    </AskContainer>
  );
}

function AskTagsOffer({
  isAskTagInputFocus,
  setIsAskTagInputFocus,
  tagsOffer,
  tagInputHandler,
}) {
  if (tagsOffer['items'])
    return (
      <AskTagOfferContainer visible={isAskTagInputFocus}>
        {tagsOffer['items'].length > 0 ? (
          tagsOffer['items'].map((obj, idx) => {
            if (idx < 6)
              return (
                <AskTagOffered
                  key={obj.name}
                  onClick={() => {
                    tagInputHandler(obj.name);
                  }}>
                  <div>
                    <AskTag>{obj.name}</AskTag>
                    <span className='ask-tag-offered-count'>
                      {obj.count}
                    </span>
                  </div>
                  <FaQuestionCircle style={{ color: '#6A737C' }} />
                </AskTagOffered>
              );
          })
        ) : (
          <span>No results found</span>
        )}
      </AskTagOfferContainer>
    );
}